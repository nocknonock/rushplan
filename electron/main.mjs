import { app, BrowserWindow, shell, Menu } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure Windows notifications display the official app title
app.setAppUserModelId('com.kaoyan.schedule.planner');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 960,
    minHeight: 680,
    title: '考研日程规划',
    backgroundColor: '#020617',
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      // Disable background timer throttling so schedule time-node alerts and Pomodoro timers fire on the exact second even when minimized
      backgroundThrottling: false,
    },
  });

  // Hide default menu bar for a clean native desktop workstation look
  Menu.setApplicationMenu(null);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open external links in the user's default system browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  const devServerUrl = process.env.VITE_DEV_SERVER_URL;
  if (devServerUrl) {
    mainWindow.loadURL(devServerUrl);
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }

  // Whenever document.title flashes on a schedule alert, flash the Windows taskbar frame to catch attention
  mainWindow.on('page-title-updated', (_event, title) => {
    if (!mainWindow) return;
    if (title.startsWith('🔔') || title.startsWith('⏰') || title.startsWith('⚠️')) {
      if (!mainWindow.isFocused()) {
        mainWindow.flashFrame(true);
      }
    } else {
      mainWindow.flashFrame(false);
    }
  });

  mainWindow.on('focus', () => {
    if (mainWindow) {
      mainWindow.flashFrame(false);
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Single instance lock so clicking the shortcut focuses the existing window
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}
