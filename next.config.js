// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')
const isProd = process.env.NODE_ENV === 'production'

module.exports = withPWA({
  swcMinify: true,
  styledComponents: true,
  jest: true,
  reactRemoveProperties: true,
  removeConsole: {
    exclude: ['error']
  },
  pwa: {
    dest: 'public',
    disable: !isProd
  }
})
