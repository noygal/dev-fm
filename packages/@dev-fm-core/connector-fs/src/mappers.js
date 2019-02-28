const statsMapper = stats => ({
  modified: stats.mtimeMs,
  size: stats.size,
  isFile: stats.isFile(),
  isDir: stats.isDirectory(),
  isLink: stats.isSymbolicLink()
})

module.exports = { statsMapper }
