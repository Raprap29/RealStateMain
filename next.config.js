/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // unoptimized: true,
    env: {
        NEXT_PUBLIC_API: 'https://serverrealapi.vercel.app'
    }
}

module.exports = nextConfig
