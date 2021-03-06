
const rootDir = require('os').homedir()
const { readDir, readStats } = require('./ops')

const init = ({ readOnly = true, ...options }) => {
  return {
    type: 'fs',
    rootDir,
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
