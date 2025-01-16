/** @type {import('next').NextConfig} */
const nextConfig = {
	output: process.env.BUILD_MODE ?? undefined,
	experimental: {
		reactCompiler: true,
	},
};

export default nextConfig;
