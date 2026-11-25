const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('kaoyanDesktop', {
  isDesktopApp: true,
  platform: process.platform,
});
