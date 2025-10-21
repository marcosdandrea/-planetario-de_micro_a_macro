import { requests } from "@common/ipcRequests";
import { eventsType } from "@common/types/events.types";
import { SpriteType } from "@common/types/sprite.type";
import { GameContext } from "@contexts/GameContext";
import { SocketContext } from "@contexts/socket";
import { useContext, useEffect } from "react";

const useSprites = (props?: {updateOnEvents?: eventsType[]}) => {
    const {socket} = useContext(SocketContext)
    const {sprites, setSprites} = useContext(GameContext);

    useEffect(()=>{
        if(!socket || !props?.updateOnEvents) return;

        const refreshSprites = () => {
            setTimeout(() => {
                getSprites();
            }, 100);
        }

        props.updateOnEvents.forEach(eventType => {
            socket.on(eventType, refreshSprites);
        });

        return () => {
            props.updateOnEvents.forEach(eventType => {
                socket.off(eventType, refreshSprites);
            });
        };
    }, [socket, props])

    const getSprites = async () => {
        if(!socket) return;
        socket.emit(requests.getSprites, null, (data: {sprites?: SpriteType[], error?: string})=>{
            if(data.error) {
                console.error("Error fetching sprites:", data.error);
                return;
            }
            setSprites(data.sprites.sort((a, b) => a.base10Size - b.base10Size) || []);
        });
    }

    useEffect(()=>{
        if(!socket) return;

        getSprites();

    },[socket])

    const deleteSprite = (spriteId: string, callback: (success: boolean) => void) => {
        if(!socket) return;

        socket.emit(requests.deleteSprite, spriteId, (response: { sprites: SpriteType[] }) => {
            if (response.sprites) {
                setSprites(response.sprites.sort((a, b) => a.base10Size - b.base10Size));
            }
            callback(!!response.sprites);
        });
    }

    const createSprite = (sprite: SpriteType, callback: (success: boolean) => void) => {
        if(!socket) return;

        socket.emit(requests.createSprite, sprite, (response: { sprites: SpriteType[] }) => {
            if (response.sprites) {
                setSprites(response.sprites.sort((a, b) => a.base10Size - b.base10Size));
            }
            callback(!!response.sprites);
        });
    }

    const updateSprite = (sprite: SpriteType, callback: (success: boolean) => void) => {
        if(!socket) return;

        socket.emit(requests.updateSprite, sprite, (response: { sprites: SpriteType[] }) => {
            if (response.sprites) {
                setSprites(response.sprites.sort((a, b) => a.base10Size - b.base10Size));
            }
            callback(!!response.sprites);
        });
    }

    return {sprites, deleteSprite, createSprite, updateSprite, getSprites};
}
 
export default useSprites