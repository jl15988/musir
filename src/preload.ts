import { contextBridge, ipcRenderer } from 'electron'
contextBridge.exposeInMainWorld('electronAPI', {
  closeApp: () => ipcRenderer.send('close-app'),
  maxApp: () => ipcRenderer.send('max-app'),
  unmaxApp: () => ipcRenderer.send('unmax-app'),
  minApp: () => ipcRenderer.send('min-app'),
  maxHandle: (isMax: boolean) => ipcRenderer.on('max-handle', isMax as never),
  scanLocal: () => ipcRenderer.send('scan')
})
