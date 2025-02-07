/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: new URL(process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL).hostname,
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
  transpilePackages: [
    '@mui/material',
    '@mui/material-nextjs',
    '@mui/system',
    '@vaka-tech/react',
    '@vaka-tech/web3-auth',
    'mui-one-time-password-input',
  ],
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    }
    return config
  },
}

export default nextConfig
