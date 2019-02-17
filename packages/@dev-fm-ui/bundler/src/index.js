const Bundler = require('parcel-bundler')

const init = ({
  isProd = false,
  filePath,
  outDir,
  target = 'browser',
  ...options
}) => {
  const bundler = new Bundler(filePath, {
    outDir,
    watch: !isProd,
    cache: !isProd,
    minify: false,
    detailedReport: isProd,
    ...options
  })
  return {
    getMiddleware: () => bundler.middleware(),
    bundle: () => bundler.bundle()
  }
}

module.exports = { init }
