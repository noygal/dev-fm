const rootDir = 'ftp://ftp.cs.brown.edu/pub'
const { readDir } = require('./ops')

const init = ({ readOnly = true, ...options }) => {
  return {
    type: 'ftp',
    rootDir,
    support: {
      read: true,
      write: !readOnly,
      progress: false,
      watch: false,
      stream: true
    },
    op: {
      readDir
    }
  }
}

module.exports = { init }
