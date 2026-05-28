const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: []
  }
};

module.exports = withNextIntl(nextConfig);
