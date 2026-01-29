/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: "export",
  images: {
    formats: ["image/webp"],
  },
  experimental: {
    optimizeCss: true,
    nextScriptWorkers: true,
  },
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  reactStrictMode: false,
};

module.exports = nextConfig
