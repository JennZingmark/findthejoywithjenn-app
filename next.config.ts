import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",

  // This is the key: it injects your script into the generated service worker
  importScripts: ["/sw-push.js"],
})(nextConfig);