import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'
// import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      secure: true,
      standard: true
    }
  }
])
let win: any = null


async function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    useContentSize: true,
    width: 1220,
    height: 640,
    minWidth: 600,
    minHeight: 640,
    frame: false,
    // transparent: true, // 窗口透明  设置后还原窗口win.restore()无效
    // backgroundColor: '#000', // 背景颜色
    title: 'Musir', // 标题
    movable: true,
    autoHideMenuBar: true,
    webPreferences: {
      // Required for Spectron testing
      // enableRemoteModule: !!process.env.IS_TEST,
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env
        .ELECTRON_NODE_INTEGRATION as unknown as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.resolve(__dirname, 'preload.js') // 预加载
    }
  })

  win.setMenu(null)

  win.on('maximize', () => {
    win.webContents.send('max-handle', true)
  })

  win.on('unmaximize', () => {
    win.webContents.send('max-handle', false)
  })

  if (process.env.NODE_ENV === 'production') {
    // 正式
    createProtocol('app')
    win.loadURL('app://./index.html') // Load the index.html when not in development
    // win.webContents.openDevTools()
  } else {
    // 开发
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  }
  // 当应用所有窗口关闭要做的事情
  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // 外网 加载慢 去掉
  //   if (isDevelopment && !process.env.IS_TEST) {
  //     // Install Vue Devtools
  //     try {
  //       await installExtension(VUEJS3_DEVTOOLS)
  //     } catch (e) {
  //       console.error('Vue Devtools failed to install:', e.toString())
  //     }
  //   }
  if (win === null) createWindow()
})
// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// 关闭窗体
ipcMain.on('close-app', (event) => {
  win.close()
})

// 最大化窗体
ipcMain.on('max-app', (event) => {
  win.maximize()
})

// 还原窗体
ipcMain.on('unmax-app', (event) => {
  win.unmaximize()
})

// 最小化窗体
ipcMain.on('min-app', (event) => {
  win.minimize()
})
