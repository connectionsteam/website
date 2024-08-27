/** @type {import("next").NextConfig} */

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.discordapp.com",
				port: "",
				pathname: "/avatars/**",
			},
			{
				protocol: "https",
				hostname: "flagpedia.net",
				port: "",
				pathname: "/data/flags/w702/**",
			},
		],
	},
	rewrites: () => {
		return [
			{
				source: "/api/:path*",
				destination: `${process.env.PROXY_URL}/api/:path*`,
			},
		];
	},
	env: {
		PROXY_URL: process.env.PROXY_URL,
	},
};

export default nextConfig;
