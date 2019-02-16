
import React from 'react'
import App from './src/container/app'
const ReactDOM = require('react-dom')

const render = ({ domId, reactEl }) => {
  ReactDOM.render(reactEl, document.getElementById(domId))
}

module.exports = {
  render,
  renderApp: ({ domId = 'root', props }) => render({ domId, reactEl: <App {...props} /> })
}
