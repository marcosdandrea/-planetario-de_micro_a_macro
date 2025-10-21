import path from 'path';

const isDev = process.env.NODE_ENV === 'development'
const isHeadless = process.env.HEADLESS === 'true'

const getAppPath = async () => {
  if (isHeadless) {
    return process.cwd();
  } else {
    const { app } = await import('electron');
    return app.getAppPath();    
  }
}

export async function getStaticDir() {
  const appPath = await getAppPath();
  // Tanto en modo headless como Electron usamos dist-react
  return path.join(appPath, 'dist-react');
}

export async function getAssetPath() {
  const appPath = await getAppPath();
  return path.join(appPath, isDev ? '.' : '..', '/src/assets');
}

export async function getDatabasePath() {
  if (isHeadless) {
    return path.join(process.cwd(), 'database');
  } else {
    const { app } = await import('electron');
    const appPath = app.getAppPath();
    return path.join(appPath, 'database');
  }
}

export async function getResourcesPath() {
  if (isHeadless) {
    return path.join(process.cwd(), 'resources');
  } else {
    const { app } = await import('electron');
    const appPath = app.getAppPath();
    return path.join(appPath, 'resources');
  }
}
