/** @type {import('next-i18next').UserConfig } */
const { i18n } = require('next-i18next');

module.exports = i18n({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePath: './public/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
});
