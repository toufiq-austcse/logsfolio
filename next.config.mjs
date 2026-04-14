import withMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    images: {
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