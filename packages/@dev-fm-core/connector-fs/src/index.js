
const fs = require('fs-extra')

const readDir = path => fs.readdir(path)
const readStats = path => fs.stat(path)

const init = ({ readOnly = false, ...options }) => {
  return {
    type: 'fs',
    support: {
      write: readOnly,
      progress: false,
      watch: true,
      stream: true
    },
    ops: {
      readDir,
      readStats
    }
  }
}

module.exports = { init }
