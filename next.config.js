// next.config.js
/** @type {import('next').NextConfig} */
const withSvgr = require('next-svgr');

module.exports = withSvgr({
  reactStrictMode: true,
  // Остальной твой config (если нужен)
  webpack(config) {
    // отключаем стандартную загрузку svg как статичных файлов
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test?.toString().includes('svg')
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }
    return config;
  },
});
