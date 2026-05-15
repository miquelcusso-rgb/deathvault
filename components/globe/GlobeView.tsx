"use client";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import type { HistoricalEvent } from "@/data/events";

interface Props {
  event: HistoricalEvent | null;
  allEvents: HistoricalEvent[];
  onEventClick?: (event: HistoricalEvent) => void;
}

interface DotData {
  mesh: THREE.Mesh;
  event: HistoricalEvent;
  label: string;
}

interface Tooltip {
  x: number;
  y: number;
  text: string;
}

function latLngToVec3(lat: number, lng: number, radius = 1): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export function GlobeView({ event, allEvents, onEventClick }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  // Refs for Three.js objects that persist across renders
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const dotsGroupRef = useRef<THREE.Group | null>(null);
  const ringsGroupRef = useRef<THREE.Group | null>(null);
  const dotsDataRef = useRef<DotData[]>([]);
  const rafRef = useRef<number>(0);
  const ringTimeRef = useRef(0);

  // Orbit state
  const spherical = useRef({ theta: 0, phi: Math.PI / 2, radius: 2.8 });
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const pointerDownPos = useRef({ x: 0, y: 0 });

  // Keep latest props accessible in callbacks without re-running setup effect
  const eventRef = useRef(event);
  const onEventClickRef = useRef(onEventClick);
  useEffect(() => { eventRef.current = event; }, [event]);
  useEffect(() => { onEventClickRef.current = onEventClick; }, [onEventClick]);

  // ── Setup Three.js scene (once) ──────────────────────────────────────────
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth || 800;
    const H = container.clientHeight || 600;

    // Scene
    const scene = new THREE.Scene();

    // Stars (distributed on a sphere shell)
    const starsGeo = new THREE.BufferGeometry();
    const starPos: number[] = [];
    for (let i = 0; i < 4000; i++) {
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      const r = 80 + Math.random() * 20;
      starPos.push(r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t));
    }
    starsGeo.setAttribute("position", new THREE.Float32BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.25, sizeAttenuation: true, transparent: true, opacity: 0.85 })));

    // Camera
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 500);
    camera.position.set(0, 0, 2.8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dl1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dl1.position.set(5, 3, 5);
    scene.add(dl1);
    const dl2 = new THREE.DirectionalLight(0x1e3a5f, 0.3);
    dl2.position.set(-5, -3, -5);
    scene.add(dl2);

    // Earth — load texture map (NASA Blue Marble via three.js CDN)
    const loader = new THREE.TextureLoader();
    const earthMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,          // neutral so texture colours show through
      emissive: 0x000000,
      specular: 0x333333,
      shininess: 8,
    });
    const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), earthMat);
    scene.add(earthMesh);

    // Load day texture + specular map
    loader.load(
      "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r167/examples/textures/planets/earth_atmos_2048.jpg",
      (tex) => { earthMat.map = tex; earthMat.needsUpdate = true; },
    );
    loader.load(
      "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r167/examples/textures/planets/earth_specular_2048.jpg",
      (tex) => { earthMat.specularMap = tex; earthMat.needsUpdate = true; },
    );

    // Subtle cyan wireframe grid on top
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.002, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.06 }),
    ));

    // Atmosphere glow
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.07, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x0a3060, transparent: true, opacity: 0.12, side: THREE.BackSide }),
    ));

    // Groups for dynamic dots/rings
    const dotsGroup = new THREE.Group();
    const ringsGroup = new THREE.Group();
    scene.add(dotsGroup);
    scene.add(ringsGroup);
    dotsGroupRef.current = dotsGroup;
    ringsGroupRef.current = ringsGroup;

    // ── Manual orbit controls ───────────────────────────────────────────────
    const sp = spherical.current;

    function syncCamera() {
      camera.position.set(
        sp.radius * Math.sin(sp.phi) * Math.sin(sp.theta),
        sp.radius * Math.cos(sp.phi),
        sp.radius * Math.sin(sp.phi) * Math.cos(sp.theta),
      );
      camera.lookAt(0, 0, 0);
    }

    const canvas = renderer.domElement;

    function onPointerDown(e: PointerEvent) {
      isDragging.current = true;
      lastPointer.current = { x: e.clientX, y: e.clientY };
      pointerDownPos.current = { x: e.clientX, y: e.clientY };
      canvas.setPointerCapture(e.pointerId);
    }

    function onPointerMove(e: PointerEvent) {
      if (!isDragging.current) return;
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      sp.theta -= dx * 0.006;
      sp.phi = Math.max(0.1, Math.min(Math.PI - 0.1, sp.phi - dy * 0.006));
      lastPointer.current = { x: e.clientX, y: e.clientY };
      syncCamera();
    }

    function onPointerUp(e: PointerEvent) {
      const dx = Math.abs(e.clientX - pointerDownPos.current.x);
      const dy = Math.abs(e.clientY - pointerDownPos.current.y);
      if (dx < 5 && dy < 5) handleClick(e);
      isDragging.current = false;
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      sp.radius = Math.max(1.5, Math.min(4, sp.radius + e.deltaY * 0.002));
      syncCamera();
    }

    function handleClick(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      const ray = new THREE.Raycaster();
      ray.setFromCamera(mouse, camera);
      const meshes = dotsDataRef.current.map((d) => d.mesh);
      const hits = ray.intersectObjects(meshes);
      if (hits.length > 0) {
        const hit = dotsDataRef.current.find((d) => d.mesh === hits[0].object);
        if (hit) onEventClickRef.current?.(hit.event);
      }
    }

    function onMouseMove(e: MouseEvent) {
      if (isDragging.current) { setTooltip(null); return; }
      const rect = canvas.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      const ray = new THREE.Raycaster();
      ray.setFromCamera(mouse, camera);
      const meshes = dotsDataRef.current.map((d) => d.mesh);
      const hits = ray.intersectObjects(meshes);
      if (hits.length > 0) {
        const hit = dotsDataRef.current.find((d) => d.mesh === hits[0].object);
        if (hit) {
          canvas.style.cursor = "pointer";
          setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, text: `${hit.event.name} — ${hit.label}` });
          return;
        }
      }
      canvas.style.cursor = "";
      setTooltip(null);
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("mousemove", onMouseMove);

    // Resize
    const ro = new ResizeObserver(() => {
      const W = container.clientWidth;
      const H = container.clientHeight;
      if (!W || !H) return;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    });
    ro.observe(container);

    // ── Animation loop ──────────────────────────────────────────────────────
    function animate() {
      rafRef.current = requestAnimationFrame(animate);
      ringTimeRef.current += 0.016;

      // Auto-rotate when idle
      if (!eventRef.current && !isDragging.current) {
        sp.theta += 0.0018;
        syncCamera();
      }

      // Animate pulse rings
      ringsGroup.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        const phase = (mesh.userData.phase as number) ?? 0;
        const t = (ringTimeRef.current * 0.6 + phase) % 1;
        mesh.scale.setScalar(1 + t * 2.2);
        (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - t) * 0.7;
      });

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      if (container.contains(canvas)) container.removeChild(canvas);
      rendererRef.current = null;
      cameraRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Update dots & rings when event / allEvents changes ───────────────────
  useEffect(() => {
    const dotsGroup = dotsGroupRef.current;
    const ringsGroup = ringsGroupRef.current;
    if (!dotsGroup || !ringsGroup) return;

    // Dispose and clear old meshes
    const clearGroup = (group: THREE.Group) => {
      group.children.slice().forEach((child) => {
        const mesh = child as THREE.Mesh;
        mesh.geometry?.dispose();
        if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose());
        else (mesh.material as THREE.Material)?.dispose();
        group.remove(mesh);
      });
    };
    clearGroup(dotsGroup);
    clearGroup(ringsGroup);
    dotsDataRef.current = [];

    // Add dots for every event region
    allEvents.forEach((ev) => {
      ev.regions.forEach((r) => {
        const isActive = event?.id === ev.id;
        const opacity = event ? (isActive ? 0.95 : 0.25) : 0.9;
        const radius = ((r.intensity * 0.6 + 0.3) * 0.012) * (isActive ? 1.4 : 1);

        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(radius, 8, 8),
          new THREE.MeshBasicMaterial({ color: new THREE.Color(ev.color), transparent: true, opacity }),
        );
        mesh.position.copy(latLngToVec3(r.lat, r.lng, 1.013));
        dotsGroup.add(mesh);
        dotsDataRef.current.push({ mesh, event: ev, label: r.label });
      });
    });

    // Add pulsing rings for active event
    if (event) {
      event.regions.forEach((r, i) => {
        const pos = latLngToVec3(r.lat, r.lng, 1.011);
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 0, 1),
          pos.clone().normalize(),
        );
        // Two offset rings per location
        [0, 0.5].forEach((offset, j) => {
          const ring = new THREE.Mesh(
            new THREE.RingGeometry(0.015, 0.026, 32),
            new THREE.MeshBasicMaterial({ color: new THREE.Color(event.color), transparent: true, opacity: 0.7, side: THREE.DoubleSide, depthWrite: false }),
          );
          ring.position.copy(pos);
          ring.quaternion.copy(quat);
          ring.userData.phase = i * 0.35 + j * offset;
          ringsGroup.add(ring);
        });
      });
    }
  }, [event, allEvents]);

  return (
    <div ref={mountRef} className="w-full h-full relative bg-transparent">
      {tooltip && (
        <div
          className="absolute pointer-events-none z-10 bg-surface/90 border border-border/60 px-2.5 py-1.5 rounded-lg text-xs text-white font-mono whitespace-nowrap shadow-lg"
          style={{ left: tooltip.x + 14, top: tooltip.y - 18 }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
