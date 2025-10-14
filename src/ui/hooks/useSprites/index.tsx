import { gameRequests } from "@common/ipcRequests";
import { navigationData } from "@common/types/navigation.type";
import { SpriteType } from "@common/types/sprite.type";
import { GameContext } from "@contexts/GameContext";
import { SocketContext } from "@contexts/socket";
import { useContext, useEffect } from "react";

const useSprites = () => {
    const {socket} = useContext(SocketContext)
    const {sprites, setSprites} = useContext(GameContext);

    useEffect(()=>{
        if(!socket) return;

        socket.emit(gameRequests.getNavigationData, null, (data: navigationData[])=>{
            const sprites = data.map(d=> d.sprite);
            setSprites(sprites);
        });

    },[socket])

    return {sprites};
}
 
export default useSprites