import withMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/logsfolio' : '';

const nextConfig = {
    output: 'export',
    basePath,
    assetPrefix: isProd ? '/logsfolio/' : '',
    env: {
        NEXT_PUBLIC_BASE_PATH: basePath,
    },
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dezjzojvmw4by.cloudfront.net',
                pathname: '/photos/**',
            },
        ],
    },
};

export default withMDX()(nextConfig)