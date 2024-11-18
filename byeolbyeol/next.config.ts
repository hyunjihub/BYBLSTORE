import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/mypage',
        destination: '/mypage/wishlist',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
