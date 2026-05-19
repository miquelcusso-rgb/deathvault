/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // three.js is used directly (no @react-three/fiber reconciler)
  transpilePackages: ["three"],

  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: "canvas" }];
    return config;
  },
};

export default nextConfig;
