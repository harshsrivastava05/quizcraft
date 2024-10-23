/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/sign-in",
        destination: "/api/auth/login",
        permanent: true,
      },
      {
        source: "/sign-up",
        destination: "/api/auth/register",
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**", // Allow any path under this hostname
      },
      {
        protocol: "https",
        hostname: "gravatar.com", // Support gravatar.com images
        port: "",
        pathname: "/**", // Allow any path under this hostname
      },
    ],
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Disable certain packages if necessary
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    // Additional customizations can go here

    return config;
  },
};

export default nextConfig;
