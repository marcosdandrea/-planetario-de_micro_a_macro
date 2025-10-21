import path from "path"
import fs from "fs";


export const appendToFile = (filePath: string, data: any) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, data, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
};

export const appendToTextFile = (filePath: string, data: string) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, data, { encoding: 'utf-8', flag: 'a' }, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
};

export const renameFile = (oldPath: string, newPath: string) => {
    return new Promise((resolve, reject) => {
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
};

export const writeFile = (filePath: string, data: any) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, 'utf-8', (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
}

export const readFile = (filePath: string) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

