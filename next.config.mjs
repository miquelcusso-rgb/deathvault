/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,

  // Serve WebP/AVIF for any next/image usage
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // three.js is used directly (no @react-three/fiber reconciler)
  transpilePackages: ["three"],

  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: "canvas" }];
    return config;
  },
};

export default nextConfig;
