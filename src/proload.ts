// import { contextBridge, ipcRenderer } from 'electron'
// contextBridge.exposeInMainWorld('electron', { ipcRenderer }) //使用这种 会报错，因为contextIsolation：false是非安全的，设置为true  此文件就获取不到
import { ipcRenderer } from 'electron';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
(window).ipcRenderer = ipcRenderer
