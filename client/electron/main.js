import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
    const win = new BrowserWindow({
        width: 1800,
        height: 966,
        // resizable: false,
        // frame: false,
        transparent: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
        },
    });

    if (process.env.ELECTRON_START_URL) {
        win.loadURL(process.env.ELECTRON_START_URL);
        win.webContents.openDevTools({ mode: 'detach' });
    } else {
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    }
}

app.whenReady().then(() => {
    createWindow();
});
