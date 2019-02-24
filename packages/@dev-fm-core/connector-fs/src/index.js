
const fs = require('fs-extra')

const readDir = ({ path }) => fs.readdir(path)
const readStats = ({ path }) => fs.stat(path)

const init = ({ readOnly = true, ...options }) => {
  return {
    type: 'fs',
    support: {
      read: true,
      write: !readOnly,
      progress: false,
      watch: true,
      stream: true
    },
    op: {
      readDir,
      readStats
    }
  }
}

module.exports = { init }
