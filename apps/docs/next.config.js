/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.BUILD_MODE ?? undefined,
    experimental: {
        reactCompiler: true,
    },
    basePath: process.env.BASE_PATH ?? undefined,
};

export default nextConfig;
