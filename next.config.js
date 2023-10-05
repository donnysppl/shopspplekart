/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        stagingURL: 'https://staging.ekartlogistics.com',
        productionURL: 'https://api.ekartlogistics.com',
        stagingBase: 'Basic cGxhc3Ryb25pY3NsYXJnZTpkdW1teUtleQ==',
        productionBase: 'Basic cGxhc3Ryb25pY3NsYXJnZTo1NnojNCE3NTdLRUY0T2lJ'
    },
}

module.exports = nextConfig
