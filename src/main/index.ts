import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { installExtension } from 'electron-devtools-installer'
import icon from '../../resources/icon.png?asset'
import * as constants from '../shared/constants'
import * as ipcHandlers from './ipc/handlers'
import * as protocolHandlers from './protocol/handlers'
import { nameof } from '../shared/helpers'
import { ElectronUserAPI } from '../shared/types'
import * as path from 'node:path'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: constants.DEFAULT_WIDTH,
    height: constants.DEFAULT_HEIGHT,
    minWidth: constants.MIN_WIDTH,
    minHeight: constants.MIN_HEIGHT,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

async function installExtensions(): Promise<void> {
  if (is.dev) {
    for (const extension of constants.EXTENSIONS) {
      try {
        await installExtension(extension)
        console.log(`Added Extension: ${JSON.stringify(extension)}`)
      } catch (e) {
        console.log(`Error occurred while adding extension: ${JSON.stringify(extension)}`, e)
      }
    }
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Set handling of callback for Spotify authorization
  app.setAsDefaultProtocolClient(constants.APP_PROTOCOL, process.execPath, [
    path.resolve(process.argv[1])
  ])

  // Ipc handlers
  ipcMain.handle(nameof<ElectronUserAPI>('ping'), ipcHandlers.ping)
  ipcMain.handle(nameof<ElectronUserAPI>('getDevices'), ipcHandlers.getDevices)
  ipcMain.handle(nameof<ElectronUserAPI>('getDeviceState'), ipcHandlers.getDeviceState)

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  createWindow()
  await installExtensions()
})

// --- Single Instance Lock ---
// This is crucial to ensure that when the OS opens your app via the protocol,
// it focuses the existing window instead of opening a new one.
const instanceLock = app.requestSingleInstanceLock()
if (!instanceLock) {
  app.quit()
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// On opening as second instance - via protocol - which was registered above with `setAsDefaultProtocolClient`,
app.on('second-instance', (_, commandLine) => {
  // Handle the protocol url from the command line (for Windows/Linux)
  const url = commandLine.pop()?.slice(0, -1)

  if (url) {
    // Parse handler callback name and parameters from the url (after the protocol)
    const parts = /(?<=:\/\/)([\w|-]+)#?(.+)?/.exec(url) || []
    const handlerName = parts[1] || ''
    const urlParamsRaw = parts[2] || ''

    // handle spotify authorization token
    switch (handlerName) {
      case constants.PROTOCOL_HANDLERS.SPOTIFY_AUTH:
        protocolHandlers.handleSpotifyAuthCallback(urlParams)
        break
      default:
        console.warn(`No handler for protocol: ${handlerName}`)
    }
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
