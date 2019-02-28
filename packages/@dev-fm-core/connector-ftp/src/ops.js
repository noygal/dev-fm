const Client = require('ftp')
const { URL } = require('url')
const { statsMapper } = require('./mappers')

const readDir = ({ path }) => new Promise((resolve, reject) => {
  const c = new Client()
  const url = new URL(path)
  c.on('ready', () => {
    c.list(url.pathname, (err, list = []) => {
      if (err) reject(err)
      c.end()
      resolve(
        list.map(file => ({
          path: `${path}/${file.name}`,
          ...statsMapper(file)
        }))
      )
    })
  })
  c.on('error', reject)
  c.connect({
    host: url.hostname,
    port: url.port,
    user: url.username,
    password: url.password
  })
})

module.exports = { readDir }
