import React from 'react'
const clientFactory = require('@dev-fm-core/http/src/client/connector')

const App = props => (<div>hi</div>)

clientFactory.create({ basePath: '/connector/fs/' }, { fetch, logger: console })
  .then(client => client.readDir({ path: '/Users/gal/dev/dev-fm' }))
  .then(console.error)

export default App
