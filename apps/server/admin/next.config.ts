/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.BUILD_MODE ?? undefined as any,
    experimental: {
        reactCompiler: true,
    },
};

export default nextConfig;
