
const nextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/public/**',
        search: '',
      },
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/Uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
