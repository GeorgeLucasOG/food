import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "u9a6wmr3as.ufs.sh" },
      { hostname: "img.cardapio.menu" },
      { hostname: "images2.imgbox.com" },
      { hostname: "img.freepik.com" },
    ],
  },
};

export default nextConfig;
