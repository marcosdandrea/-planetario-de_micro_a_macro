import { bindIpcServices } from '@src/services/ipcServices';
import { getStaticDir } from '@src/utils/pathResolver';
import { Log } from '@utils/log.js';
import path from 'path';
const log = new Log('coreProcesses', true);

const coreProcesses = async () => {
    log.info('Starting core processes...');
    try {
        const MAIN_SERVER_PORT = process.env.MAIN_SERVER_PORT ? parseInt(process.env.MAIN_SERVER_PORT) : 3000;
        
        const { init: initServer } = await import('@services/Server/index.js')
        const staticDirectory = await getStaticDir();
        log.info(`Static directory: ${staticDirectory}`);
        
        const { httpServer, app } = await initServer({ 
            serverPort: MAIN_SERVER_PORT,
            staticDir: staticDirectory
        });

        const express = (await import("express")).default;

        const databasePath = path.join(process.cwd(), 'database');     
        app.use('/database', express.static(databasePath));
        log.info(`Serving database files from: ${databasePath}`);   

        log.info(`Server initialized on port ${MAIN_SERVER_PORT}`);

        const { init: initSocket } = await import('@services/Socket/index.js')
        const io = await initSocket({ httpServer });
        io.on('connection', (socket) => bindIpcServices(socket));
        log.info('Socket initialized.');

        log.info('Core processes completed.');
    } catch (error) {
        log.error('Error in core processes:', error);
        throw error;
    }
}


export { coreProcesses }