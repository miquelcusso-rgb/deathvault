// DeathVault brand mark — "the sealed pulse" shield: a dark shield holding an
// amber flatline (one beat, then flat) with the origin point. Rendered as the
// filled app-icon tile so the navbar/footer logo matches the favicon exactly.
// Scales cleanly from 16px favicon to large hero. One amber accent works on
// both light and dark surfaces.
export function BrandMark({
  size = 30,
  color = "#F59E0B",
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  const dark = "#0A0905";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      {/* Amber tile */}
      <rect width="100" height="100" rx="24" fill={color} />
      {/* Shield */}
      <path d="M50 16 L82 27 L82 54 Q82 78 50 91 Q18 78 18 54 L18 27 Z" fill={dark} />
      {/* Flatline pulse — one beat, then flat */}
      <path
        d="M28 54 H45 L50 41 L56 67 L61 54 H75"
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Origin point */}
      <circle cx="28" cy="54" r="3.8" fill={color} />
    </svg>
  );
}
