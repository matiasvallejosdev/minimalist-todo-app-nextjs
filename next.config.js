const SITE = require('./src/config.js').SITE;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  trailingSlash: SITE.trailingSlash,
  basePath: SITE.basePathname !== '/' ? SITE.basePathname : '',

  swcMinify: true,
  poweredByHeader: false,

  env: {
    BASE_URL: process.env.BASE_URL,
    JWT_NAME: process.env.JWT_NAME,
    JWT_SECRET: process.env.JWT_SECRET
  },

  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};