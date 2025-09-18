/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL('https://tbymrebzmgbidchigdlc.supabase.co/**'),
    ],
  },
};

export default nextConfig;

