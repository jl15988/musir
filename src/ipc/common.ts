import { ipcMain, dialog } from 'electron'

import { homedir } from 'os'
// eslint-disable-next-line camelcase
import child_process from 'child_process'

const homeDir = homedir()
const desktopDir = `${homeDir}/Desktop`

ipcMain.on('scan', () => {
  dialog.showOpenDialog({
    title: '选择要扫描的文件夹',
    defaultPath: desktopDir,
    buttonLabel: '选择',
    properties: ['openDirectory', 'multiSelections']
  }).then(res => {
    if (res.filePaths && res.filePaths.length > 0) {
      const cp = child_process.fork('src/utils/scanFile.js')
      cp.on('message', () => {
        // e.sender.send('scanningEnd')
        cp.disconnect()
      })
      cp.send(res.filePaths)
    }
  })
})
