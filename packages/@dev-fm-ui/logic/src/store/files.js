import { observable, action, computed } from 'mobx'

export default class FilesStore {
    @observable files = {}

    constructor (connector) {
      this.connector = connector
    }

    @action
    readStats = ({ path }) =>
      this.connector.op.readStats({ path })
        .then(stats => (this.files[path] = { path, ...this.files[path], ...stats }))

    @action
    readDir ({ path }) {
      this.files[path] = { path, isDir: true }
      return this.connector.op.readDir({ path })
        .then(this.addFiles)
    }

    @action
    addFiles = files => {
      files.forEach(({ path, ...rest }) => (this.files[path] = { path, ...this.files[path.key], ...rest }))
      return files
    }

    @computed
    get fileList () {
      return Object.values(this.files)
    }
}

module.exports = FilesStore
