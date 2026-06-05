import withMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    env: {
        NEXT_PUBLIC_BASE_PATH: '',
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