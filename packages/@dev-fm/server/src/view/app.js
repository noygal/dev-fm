
require('@dev-fm-core/http/src/client')
  .create({ basePath: '/connector/ftp/' }, { fetch, logger: console })
  .then(fsClient => {
    const FilesStore = require('@dev-fm-ui/logic/src/store/files')
    const filesStore = new FilesStore(fsClient)
    // filesStore.readDir({ path: filesStore.connector.rootDir })
    require('@dev-fm-ui/application').renderApp({ props: { filesStore } })
  })
