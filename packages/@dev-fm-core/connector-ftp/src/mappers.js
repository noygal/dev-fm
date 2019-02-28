const statsMapper = ({ date, size, type }) => ({
  modified: date.getTime(),
  size,
  isFile: type === '-',
  isDir: type === 'd',
  isLink: type === 'l'
})

module.exports = { statsMapper }
