import React, { useEffect, useState } from 'react'
// import { toJS } from 'mobx'
import { useObserver } from 'mobx-react-lite'
import FileBrowser from 'react-keyed-file-browser'

const App = ({ filesStore }) => {
  const [initialized, setInitialized] = useState(false)
  useEffect(() => {
    !initialized && filesStore.readDir({ path: filesStore.connector.rootDir })
    setInitialized(true)
  })
  return useObserver(() => (
    <div style={{ width: '30rem', margin: '0 auto' }}>
      <FileBrowser
        startOpen
        detailRenderer={() => null}
        files={filesStore.fileList.map(({ path, ...rest }) => ({ key: path, ...rest })
        )}
      />
    </div>
  ))
}

export default App
