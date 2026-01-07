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
        ],
    },
};

export default nextConfig;
