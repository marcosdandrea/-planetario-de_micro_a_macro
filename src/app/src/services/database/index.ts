import fs from "fs";
import path from "path";

export const readDbFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(process.cwd(), 'database/db.json'), 'utf-8', (err, data) => {
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

export const writeDbFile = (data: any) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path.join(process.cwd(), 'database/db.json'), JSON.stringify(data, null, 2), 'utf-8', (err) => {
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
        
        const dbFolder = path.join(process.cwd(), "database");
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