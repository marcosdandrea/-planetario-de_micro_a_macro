import { gameRequests } from "@common/ipcRequests";
import { navigationData } from "@common/types/navigation.type";
import { GameContext } from "@contexts/GameContext";
import { SocketContext } from "@contexts/socket";
import { useContext, useEffect } from "react";

const useBackgrounds = () => {
    const {socket} = useContext(SocketContext)
    const {backgrounds, setBackgrounds} = useContext(GameContext);

    useEffect(()=>{
        if(!socket) return;

        socket.emit(gameRequests.getNavigationData, null, (data: navigationData[])=>{
            const bgs = data.map(d=> d.background);
            setBackgrounds(bgs);
        });

    },[socket])

    return {backgrounds};
}

export default useBackgrounds;

     