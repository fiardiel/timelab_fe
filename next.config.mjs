/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tbymrebzmgbidchigdlc.supabase.co',
      },
    ],
  },
};

export default nextConfig;

