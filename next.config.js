/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        presets: ['next/babel'],
        plugins: [
            ["superjson-next", {}]
        ]
    },
    images: {
        domains: [
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com",

        ]
    }
}

module.exports = nextConfig
