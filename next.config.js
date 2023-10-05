/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        stagingURL: 'https://staging.ekartlogistics.com',
        productionURL: 'https://api.ekartlogistics.com',
        stagingBase: 'Basic cGxhc3Ryb25pY3NsYXJnZTpkdW1teUtleQ==',
        productionBase: 'Basic cGxhc3Ryb25pY3NsYXJnZTo1NnojNCE3NTdLRUY0T2lJ'
    },
    async headers() {
        return [
            {
                // This works, and returns appropriate Response headers:
                source: '/(.*).jpg',
                headers: [
                    {
                        key: 'Cache-Control',
                        value:
                            'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
                    },
                ],
            },
            {
                // This doesn't work for 'Cache-Control' key (works for others though):
                source: '/_next/image(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        // Instead of this value:
                        value: 'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
                        // Cache-Control response header is `public, max-age=60` in production
                        // and `public, max-age=0, must-revalidate` in development
                    },
                ],
            },
        ]
    },
}

module.exports = nextConfig
