const { promisify } = require('util')
const { join } = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const bundler = require('@dev-fm-ui/bundler')
const connectorEndpoint = require('@dev-fm-core/http').endpoint.connector

const start = async ({ port, logger }) => {
  const app = express()
  app.use(bodyParser.json())

  const bundle = bundler.init({
    isProd: false,
    filePath: join(__dirname, '/src/view/index.html')
  })

  logger.info(`Mounting health check endpoint at: '/hc'`)
  app.get('/hc', (req, res) => res.json({ status: 'OK' }))

  logger.info(`Mounting connectors endpoints at: '/connectors'`)
  connectorEndpoint.init(
    require('@dev-fm-core/connector-fs').init({}),
    {
      app,
      basePath: '/connector/',
      logger
    })

  logger.info(`Mounting UI at`)
  app.use(bundle.getMiddleware())

  logger.info(`Mounting error handler`)
  app.use((err, req, res, next) => {
    logger.error(err)
    res.statusCode < 400 && res.status(parseInt(err.status || err.statusCode || 500))
    res.json(err)
  })

  logger.info(`Mounting 404 handler`)
  app.use((req, res) => res.sendStatus(404))

  logger.info(`Starting the http server`)
  const server = await promisify(app.listen.bind(app))(3000)
  logger.info(`Server running on port: ${port}`)
  return {
    close: () => server.close()
  }
}
const logger = console
const config = {
  port: 3000,
  logger
}

process.on('unhandledRejection', error => {
  console.error('unhandledRejection')
  console.error(error)
  config.logger.error(error)
})

module.exports = start(config)
  .then(() => logger.info('Server initiation completed'))
  .catch(error => {
    logger.error('Server initiation failed')
    logger.error(error)
    return Promise.reject(error)
  })
