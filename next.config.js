/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // unoptimized: true,
    env: {
        NEXT_PUBLIC_API: 'https://serverjama.vercel.app'
    }
}

module.exports = nextConfig
