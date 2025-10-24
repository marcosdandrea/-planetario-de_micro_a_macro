import { events } from '@common/events';
import { SocketContext } from '@contexts/socket';
import useSprites from '@hooks/useSprites';
import React, { useContext, useEffect, useRef, useMemo, useCallback } from 'react';

export type PanelContextType = {
    selectedSprite: any;
    setSelectedSprite: (sprite: any) => void;
    deleteSprite: (spriteId: string, callback: (success: boolean) => void) => void;
    createSprite: (sprite: any, callback: (success: boolean) => void) => void;
    updateSprite: (sprite: any, callback: (success: boolean) => void) => void;
    getSprites: () => void;
    sprites: any[];
}

export const panelContext = React.createContext<PanelContextType | undefined>(undefined);

const PanelContextProvider = ({ children }) => {

    const {socket} = useContext(SocketContext)
    
    // Usar useRef para mantener el selectedSprite persistente entre re-renders
    const selectedSpriteRef = useRef(null);
    const hasInitialSelectionRef = useRef(false); // Rastrear si ya se hizo la selección inicial
    const [, forceUpdate] = React.useState({});
    
    // Función para forzar re-render cuando cambia selectedSprite
    const triggerUpdate = useCallback(() => {
        forceUpdate({});
    }, []);
    
    // Getter memoizado para selectedSprite
    const selectedSprite = useMemo(() => selectedSpriteRef.current, [selectedSpriteRef.current]);
    
    // Setter memoizado para selectedSprite
    const setSelectedSprite = useCallback((sprite) => {
        selectedSpriteRef.current = sprite;
        triggerUpdate();
    }, [triggerUpdate]);


    
    const { 
        deleteSprite, 
        sprites, 
        createSprite, 
        updateSprite, 
        getSprites } = useSprites({
            updateOnEvents: [
                events.spriteCreated, 
                events.spriteUpdated, 
                events.spriteDeleted
            ]});


            
    // Seleccionar automáticamente el primer sprite solo en la carga inicial
    useEffect(() => {
        if (!sprites?.length) return
        if (sprites.length > 0 && !hasInitialSelectionRef.current && !selectedSprite) {
            setSelectedSprite(sprites[0]);
            hasInitialSelectionRef.current = true;
        }
    }, [sprites, selectedSprite, setSelectedSprite]);

    useEffect(()=>{
        if(!socket) return;

        const resetSelectedSprite = () => {
            setSelectedSprite(null);
        }

        socket.on(events.spriteDeleted, resetSelectedSprite);

        return () => {
            socket.off(events.spriteDeleted, resetSelectedSprite);
        }

    }, [socket, setSelectedSprite])

    // Memoizar el valor del contexto para evitar re-renders innecesarios
    const contextValue = useMemo(() => ({
        selectedSprite,
        setSelectedSprite,
        deleteSprite,
        sprites,
        createSprite,
        updateSprite,
        getSprites
    }), [selectedSprite, setSelectedSprite, deleteSprite, sprites, createSprite, updateSprite, getSprites]);

    return (
        <panelContext.Provider value={contextValue}>
            {children}
        </panelContext.Provider>
    );
}


export default PanelContextProvider;