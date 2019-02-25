
const create = ({ basePath }, { fetch, logger }) => {
  // Simple function to creating url paths
  const r = (...routes) => `${basePath}${routes.join('/')}`
  // Post call
  const postHttpCall = op => (payload = {}) => fetch(r('op', op), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.status < 400
      ? res.json()
      : Promise.reject(new Error(`Failed call to op endpoint at: ${r('op', op)}`))
    )

  logger.info('Calling connector discovery endpoint')
  return fetch(r('discovery'))
    .then(res => res.status < 400
      ? res.json()
      : Promise.reject(new Error(`Failed call to discovery endpoint at: ${r('discovery')}`)))
    .then(({ ops, ...rest }) => ({
      ...rest,
      op: ops.reduce((acc, op) => ({ [op]: postHttpCall(op), ...acc }), {})
    })
    )
}

module.exports = { create }
