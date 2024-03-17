import NextPWA from "@ducanh2912/next-pwa";

const withPWA = NextPWA({
  dest: 'public',
  cacheOnFrontEndNav : true,
  aggresiveFrontEndNavCaching : true,
  reloadOnOnline : true,
  swcMinify : true,
  disable : false,
  workboxOptions: {
    disableDevLogs: true,
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.amazon.com",
      },
    ],
  },
};

export default withPWA(nextConfig);
