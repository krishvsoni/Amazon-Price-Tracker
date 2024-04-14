/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          child_process: false,
          net:false,
          tls:false,
          dns:false,
        };
      }
  
      return config;
    },
  };
  
  export default nextConfig;
  