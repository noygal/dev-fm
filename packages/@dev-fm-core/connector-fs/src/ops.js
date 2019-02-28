const { join } = require('path')
const fs = require('fs-extra')
const { statsMapper } = require('./mappers')

const readDir = ({ path }) => fs.readdir(path)
  .then(fileNames => fileNames.map(file => ({ path: join(path, file) })))
  .then(files => Promise.all(files.map(readStats)))

const readStats = ({ path }) => fs.stat(path)
  .then(stat => ({ path, ...statsMapper(stat) }))

module.exports = { readDir, readStats }
