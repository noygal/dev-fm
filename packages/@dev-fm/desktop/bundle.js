const bundlerFactory = require('@dev-fm-ui/bundler')
const { join } = require('path')

const run = async () => {
  const bundler = bundlerFactory.init({
    isProd: true,
    filePath: join(__dirname, 'src/view/app.js'),
    outDir: join(__dirname, 'dist'),
    target: 'electron'
  })
  await bundler.bundle()
}

run()
  .then(() => {
    console.log('bundled code to "dist" folder')
    process.exit(0)
  })
  .catch(error => {
    console.error('Failed to bundle code', error)
    process.exit(1)
  })
