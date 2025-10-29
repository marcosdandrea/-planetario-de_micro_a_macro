import fs from "fs";
import path from "path";
import { getDatabasePath } from "@src/utils/pathResolver.js";

// Helper to get packaged app path when available (used to copy initial db.json)
async function getPackagedAppPath() {
    try {
        const { app } = await import('electron');
        return app.getAppPath();
    } catch (e) {
        return null;
    }
}


const ensureDb = (databasePath) => {
    // Verificar si el directorio existe, si no, crearlo
    if (!fs.existsSync(databasePath)) {
        fs.mkdirSync(databasePath, { recursive: true });
        // Crear un db.json vacío
        const dbFilePath = path.join(databasePath, 'db.json');
        const initialData = JSON.stringify([], null, 2);
        fs.writeFileSync(dbFilePath, initialData, 'utf-8');
    }
}

export const readDbFile = async () => {
    return new Promise(async (resolve, reject) => {
        const databasePath = await getDatabasePath();
        const dbFilePath = path.join(databasePath, 'db.json');

        // Verificar si el directorio existe, si no, crearlo
        ensureDb(databasePath);

        // Verificar si el archivo existe, si no, intentar copiar un db.json empaquetado
        if (!fs.existsSync(dbFilePath)) {
            try {
                // Intentar copiar una db.json incluida en el paquete (resources/app.asar/database/db.json)
                const packagedAppPath = await getPackagedAppPath();
                if (packagedAppPath) {
                    const packagedDb = path.join(packagedAppPath, 'database', 'db.json');
                    if (fs.existsSync(packagedDb)) {
                        fs.copyFileSync(packagedDb, dbFilePath);
                    } else {
                        const initialData = JSON.stringify([], null, 2);
                        fs.writeFileSync(dbFilePath, initialData, 'utf-8');
                    }
                } else {
                    const initialData = JSON.stringify([], null, 2);
                    fs.writeFileSync(dbFilePath, initialData, 'utf-8');
                }
            } catch (error) {
                // Si falla la copia por cualquier motivo, crear un db vacío
                const initialData = JSON.stringify([], null, 2);
                try {
                    fs.writeFileSync(dbFilePath, initialData, 'utf-8');
                } catch (e) {
                    // Dejar que el error sea manejado al intentar leer/escribir más adelante
                    console.error('Error creating db.json:', e);
                }
            }
        }

        fs.readFile(dbFilePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            try {
                const json = JSON.parse(data);
                resolve(json);
            } catch (err) {
                reject(err);
            }
        });
    });
}

export const writeDbFile = async (data: any) => {
    return new Promise(async (resolve, reject) => {
        const databasePath = await getDatabasePath();
        const dbFilePath = path.join(databasePath, 'db.json');

        // Verificar si el directorio existe, si no, crearlo
        ensureDb(databasePath);

        fs.writeFile(dbFilePath, JSON.stringify(data, null, 2), 'utf-8', (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
}

async function treeShakeImages() {
    try {
        const db: any = await readDbFile();
        const referencedImages = new Set();

        // Recopilar todas las imágenes referenciadas
        if (Array.isArray(db)) {
            db.forEach(item => {
                // Agregar imagen principal
                if (item.image) {
                    referencedImages.add(item.image);
                }
                // Agregar imagen de background
                if (item.background && item.background.image) {
                    referencedImages.add(item.background.image);
                }
            });
        } else if (db.image) {
            // Mantener compatibilidad con el formato anterior
            db.image.forEach(img => referencedImages.add(img));
        }

        const dbFolder = await getDatabasePath();
        const files = await fs.promises.readdir(dbFolder);
        const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".svg"];

        const imageFiles = files.filter(file =>
            imageExtensions.includes(path.extname(file).toLowerCase())
        );

        for (const file of imageFiles) {
            if (!referencedImages.has(file)) {
                await fs.promises.unlink(path.join(dbFolder, file));
                console.log(`Eliminado archivo no utilizado: ${file}`);
            }
        }
    } catch (error) {
        console.error("Error realizando tree shaking:", error);
    }
}

treeShakeImages();