import { backgroundType } from '@common/types/background.type';
import { SpriteType } from '@common/types/sprite.type';
import React, {createContext, useEffect, useState} from 'react';

export const GameContext = createContext({} as GameContextType);

interface GameContextProviderProps {
    children: React.ReactNode;
}

interface GameContextType {
    zPos: number;
    setZPos: (newZPos: number) => void;
    zMax: number;
    setZMax: (newZMax: number) => void;
    sprites?: SpriteType[];
    zIndex?: number;
    setZIndex?: (newZIndex: number) => void;
    setSprites?: (newSprites: SpriteType[]) => void;
    lastNavigationTime?: number;
    distanceBetweenSprites?: number;
    setDistanceBetweenSprites?: (newDistance: number) => void;
    stepsBetweenSprites?: number;
    //setStepsBetweenSprites?: (newSteps: number) => void;
    travelSpeed?: number;
    setTravelSpeed?: (newSpeed: number) => void;
    cullingDistance?: number;
    setCullingDistance?: (newDistance: number) => void;
    spawnDistance?: number;
    setSpawnDistance?: (newDistance: number) => void;
    cameraFocusRange?: number[];
    setCameraFocusRange?: (newRange: number[]) => void;
    autoResetAfterInactivity?: number;
    setAutoResetAfterInactivity?: (newTime: number) => void;
    backgrounds?: backgroundType[];
    setBackgrounds?: (newBackgrounds: backgroundType[]) => void;
}

const GameContextProvider = ({children}: GameContextProviderProps) => {
    const [sprites, _setSprites] = useState<SpriteType[]>();
    const [backgrounds, setBackgrounds] = useState<backgroundType[]>();
    const [zMax, _setZMax] = useState(5000);
    const [distanceBetweenSprites, setDistanceBetweenSprites] = useState(5500);
    const [zIndex, setZIndex] = useState(distanceBetweenSprites);
    const [zPos, _setZPos] = useState(zIndex);
    const [stepsBetweenSprites, setStepsBetweenSprites] = useState(7);
    const [lastNavigationTime, setLastNavigationTime] = useState(Date.now());
    const [travelSpeed, setTravelSpeed] = useState(4);
    const [cullingDistance, setCullingDistance] = useState(20000);
    const [spawnDistance, setSpawnDistance] = useState(2000);
    const [cameraFocusRange, setCameraFocusRange] = useState([500,8500]);
    const [autoResetAfterInactivity, setAutoResetAfterInactivity] = useState(30000); //in ms

    //console.log ("GameContextProvider render", {zPos, zMax, sprites, distanceBetweenSprites, zIndex, stepsBetweenSprites, travelSpeed});

    const setStartAtIndex = () => {
        if(!sprites || sprites.length === 0) return;
        const indexSprite = sprites.findIndex((s)=> s.isIndex);
        if(indexSprite !== -1){
            _setZPos(indexSprite * distanceBetweenSprites + 500);
        }
    }

    useEffect(()=>{
        setStartAtIndex();
    }, [sprites])

    useEffect(()=>{
        if(!autoResetAfterInactivity) return;
        if(autoResetAfterInactivity < 5000) return; //minimum 5 seconds

        const interval = setInterval(()=>{
            const now = Date.now();
            if(now - lastNavigationTime > autoResetAfterInactivity){
                setStartAtIndex();
                setLastNavigationTime(Date.now());
                console.log ("Auto-reset position due to inactivity");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [autoResetAfterInactivity, lastNavigationTime, zIndex]);

    const setZPos = (newZPos: number) => {
        setLastNavigationTime(Date.now());
        _setZPos(newZPos)
    };

    const setSprites = (newSprites: SpriteType[]) => {
        _setZMax(newSprites.length * distanceBetweenSprites);
        _setSprites(newSprites);
    };

    const setZMax = (newZMax: number) => _setZMax(newZMax);

    const props = {
        zPos, setZPos, 
        zMax, setZMax, 
        sprites, setSprites,
        zIndex, setZIndex, 
        lastNavigationTime,
        distanceBetweenSprites, setDistanceBetweenSprites,
        stepsBetweenSprites,
        travelSpeed, setTravelSpeed,
        cullingDistance, setCullingDistance,
        spawnDistance, setSpawnDistance,
        cameraFocusRange, setCameraFocusRange,
        autoResetAfterInactivity, setAutoResetAfterInactivity,
        backgrounds, setBackgrounds,
    }

    return ( 
    <GameContext.Provider value={props as GameContextType}>
        {children}
    </GameContext.Provider> );
}
 

export default GameContextProvider;