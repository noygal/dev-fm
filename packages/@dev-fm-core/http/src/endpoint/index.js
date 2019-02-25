/**
 *
 * @param {connector} object connector object (ref to code)
 * @param {options.app} object Express like app
 * @param {options.basePath} string base path for mounting- must end with /
 * @param {options.logger} object Console like logger
 */
const init = ({ type, op, ...rest }, { app, basePath = '', logger }) => {
  // Getting the operation list
  const ops = Object.keys(op)
  // Simple function to creating url paths
  const r = (...routes) => `${basePath}${routes.join('/')}`

  logger.info(`Mounting discovery endpoint: ${r(type, 'discovery')}`)
  app.get(r(type, 'discovery'), (req, res) => res.json({ type, ops, ...rest }))

  logger.info(`Mounting operations endpoints: ${ops.join(',')}`)
  ops.forEach(key => {
    app.post(r(type, 'op', key), (req, res) =>
      op[key](req.body)
        .then(result => res.json(result))
        .catch(error => {
          logger.error(`Captured error for endpoint: ${r(type, 'op', key)}`)
          logger.error(error)
          res.status(500).json(error)
        })
    )
  })
}

module.exports = { init }
