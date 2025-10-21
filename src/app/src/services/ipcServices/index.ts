import { requests } from "@common/ipcRequests";
import { Socket } from "socket.io";
import { Log } from "@src/utils/log";
import gameServices from "./services/game.services";
import appServices from "./services/app.services";

const log = new Log("IPC Services");

export const bindIpcServices = (socket: Socket) => {
    log.info('Connected to main process');

    socket.on('disconnect', () => {
        log.info('Disconnected from main process');
    });

    socket.on(requests.authorize, appServices.authorization);

    socket.on(requests.getSprites, gameServices.getSprites);
    socket.on(requests.createSprite, gameServices.createSprite)
    socket.on(requests.deleteSprite, gameServices.deleteSprite)
    socket.on(requests.updateSprite, gameServices.updateSprite)
    socket.on(requests.uploadSpriteImage, gameServices.uploadSpriteImage)
}

