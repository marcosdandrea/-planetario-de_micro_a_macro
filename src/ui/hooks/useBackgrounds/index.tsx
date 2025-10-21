import { requests } from "@common/ipcRequests";
import { SpriteType } from "@common/types/sprite.type";
import { GameContext } from "@contexts/GameContext";
import { SocketContext } from "@contexts/socket";
import useSprites from "@hooks/useSprites";
import { useContext, useEffect } from "react";

const useBackgrounds = () => {
    const {backgrounds, setBackgrounds} = useContext(GameContext);
    const {sprites} = useSprites()

    useEffect(()=>{
        if(!sprites) return;

            const bgs = sprites.map(d=> d.background);
            setBackgrounds(bgs);

    },[sprites])

    return {backgrounds};
}

export default useBackgrounds;

     