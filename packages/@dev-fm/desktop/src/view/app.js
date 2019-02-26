
require('@babel/register')({
  only: [ /@dev-fm-ui/ ],
  'presets': [
    [
      '@babel/preset-react',
      {
        'useBuiltIns': true
      }
    ],
    '@babel/preset-env'
  ],
  'plugins': [
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose': true }]
  ],
  extensions: ['.jsx', '.js']
})
const fsConnector = require('@dev-fm-core/connector-fs').init({})
const FilesStore = require('@dev-fm-ui/logic/src/store/files')
const filesStore = new FilesStore(fsConnector)
filesStore.readDir({ path: filesStore.connector.rootDir }).then(console.log)
require('@dev-fm-ui/application').renderApp({ props: { filesStore } })
