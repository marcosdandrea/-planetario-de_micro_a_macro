import { ChunkedImageBuffer, SpriteType } from "@common/types/sprite.type";
import { readDbFile, writeDbFile } from "@src/services/database";
import { appendToFile, renameFile } from "@src/services/file";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import { Log } from "@src/utils/log";
import EventManager from "@src/domain/entities/eventManager";
import { events } from "@common/events";
const log = new Log("Panel Services", true);

const eventManager = new EventManager();


export const getSprites = async (_null: any, callback: ({sprites, error}:{sprites?: SpriteType[], error?: string}) => void) => {
    try {
        log.info(`Fetching sprites from database`);
        const database = await readDbFile()
        const dbData = database as SpriteType[];
        callback({sprites: dbData});
    } catch (error) {
        log.error(`Error getting sprites: ${error}`);
        callback({ error: 'Error in database file' });
    }
};

export const createSprite = async (spriteData: SpriteType, callback: ({sprites, error}: {sprites?: SpriteType[], error?: string}) => void) => {

    log.info(`Creating new sprite with data: ${JSON.stringify(spriteData)}`);
    const { id, ...rest } = spriteData;
    const newSprite: SpriteType = {
        id: crypto.randomUUID(),
        ...rest,
    } as SpriteType;

    try {
        const database = await readDbFile()
        const dbData = database as SpriteType[];
        
        const {isIndex, ...rest} = spriteData;
        if (isIndex) {
            dbData.forEach((sprite, index) => {
                if (sprite.isIndex && sprite.id !== spriteData.id) {
                    dbData[index] = { ...sprite, isIndex: false };
                }
            });
        }

        dbData.push(newSprite);
        await writeDbFile(dbData);

        callback({ sprites: dbData });
        log.info(`Sprite created with ID: ${newSprite.id}`);
        eventManager.emitEvent(events.spriteCreated, { sprite: newSprite });
    } catch (error) {
        log.error(`Error creating sprite: ${error}`);
        callback({ error: 'Error in database file' });
    }

};


export const deleteSprite = async (spriteId: string, callback: ({sprites}: {sprites?: SpriteType[], error?: string}) => void) => {
    try {
        log.info(`Deleting sprite with ID: ${spriteId}`);
        const database = await readDbFile()
        const dbData = database as SpriteType[] ;
        const newDbData = dbData.filter(sprite => sprite.id !== spriteId);
        await writeDbFile(newDbData);
        callback({ sprites: newDbData});
        log.info(`Sprite deleted with ID: ${spriteId}`);
        eventManager.emitEvent(events.spriteDeleted, { spriteId });
    } catch (error) {
        log.error(`Error deleting sprite: ${error}`);
        callback({ error: 'Error in database file' });
    }

};

export const updateSprite = async (spriteData: SpriteType, callback: ({sprites, error}: {sprites?: SpriteType[], error?: string}) => void) => {
    try {
        log.info(`Updating sprite with ID: ${spriteData.id}`);
        const database = await readDbFile()
        const dbData = database as SpriteType[] ;
        const spriteIndex = dbData.findIndex(sprite => sprite.id === spriteData.id);
        if (spriteIndex === -1) {
            callback({ error: 'Sprite not found' });
            log.warn(`Sprite not found with ID: ${spriteData.id}`);
            return;
        }
        const {isIndex, ...rest} = spriteData;
        if (isIndex) {
            dbData.forEach((sprite, index) => {
                if (sprite.isIndex && sprite.id !== spriteData.id) {
                    dbData[index] = { ...sprite, isIndex: false };
                }
            });
        }
        dbData[spriteIndex] = { ...dbData[spriteIndex], ...spriteData };
        await writeDbFile(dbData);
        callback({ sprites: dbData });
        log.info(`Sprite updated with ID: ${spriteData.id}`);
        eventManager.emitEvent(events.spriteUpdated, { sprite: dbData[spriteIndex] });
    } catch (error) {
        log.error(`Error updating sprite: ${error}`);
        callback({ error: 'Error in database file' });
    }

};



//uploads an image for a sprite receiving chunked buffers
export const uploadSpriteImage = async (chunkedBuffer: ChunkedImageBuffer, callback: (response: any) => void) => {
    log.info(`Uploading sprite image: ${chunkedBuffer.filename}`);
    const tempFile = '_temp.tmp';
    const { filename, chunk, currentChunkIndex, totalChunks } = chunkedBuffer;

    const filePath = path.join(process.cwd(), 'database', filename);
    const tempFilePath = path.join(process.cwd(), 'database', tempFile);

    try {
        // Ensure the database directory exists
        const databaseDir = path.join(process.cwd(), 'database');
        if (!fs.existsSync(databaseDir)) {
            fs.mkdirSync(databaseDir, { recursive: true });
        }

        // If this is the first chunk, clear any existing temp file
        if (currentChunkIndex === 0 && fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }

        await appendToFile(tempFilePath, chunk);

        if (currentChunkIndex === totalChunks - 1) {
            // Rename temp file to final filename after all chunks are received
            await renameFile(tempFilePath, filePath);
            callback({ success: true, filename });
            log.info(`Sprite image uploaded successfully: ${filename}`);
        } else {
            callback({ success: true, chunkReceived: currentChunkIndex + 1 });
            log.info(`Received chunk ${currentChunkIndex + 1} for sprite image: ${filename}`);
        }

    } catch (error) {
        log.error(`Error uploading sprite image: ${error}`);
        callback({ success: false, error: 'Error uploading sprite image' });
    }
};

export default {
    getSprites,
    createSprite,
    deleteSprite,
    updateSprite,
    uploadSpriteImage,
};