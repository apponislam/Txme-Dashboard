import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "texme-media-bucket.s3.us-east-1.amazonaws.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "cdn.example.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "fahim_hasan5000.binarybards.online",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
