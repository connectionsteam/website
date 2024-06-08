/** @type {import("next").NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.discordapp.com",
                port: "",
                pathname: "/avatars/**",
            }
        ]
    },
    rewrites: () => {
        return [
            {
                source: "/api/:path*",
                destination: `${process.env.proxy_url}/api/:path*` 
            }
        ];
    },
    env: {
        proxy_url: process.env.PROXY_URL,
    }
};

export default nextConfig;
