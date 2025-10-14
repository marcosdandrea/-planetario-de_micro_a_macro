import { gameRequests } from "@common/ipcRequests";
import { Socket } from "socket.io";
import gameServices from "./services/game.services";
import { Log } from "@src/utils/log";
const log = new Log("IPC Services");

export const bindIpcServices = (socket: Socket) => {
    log.info('Connected to main process');

    socket.on('disconnect', () => {
        log.info('Disconnected from main process');
    });

    socket.on(gameRequests.getNavigationData, gameServices.getSpriteData)
}