import { GameContext } from '@contexts/GameContext';
import { useContext, useEffect, useState } from 'react';

const useTravelPosition = () => {
    const { zPos, setZPos, sprites, distanceBetweenSprites } = useContext(GameContext)
    const [traveledPercentage, setTraveledPercentage] = useState(0);

    useEffect(() => {
        if (!sprites?.length) return;
        if (distanceBetweenSprites === undefined) return;
        const totalLength = distanceBetweenSprites * (sprites.length - 1);
        const clampedZPos = Math.min(Math.max(zPos, 0), totalLength);
        const progress = clampedZPos / totalLength;
        setTraveledPercentage(progress);  
    }, [zPos, distanceBetweenSprites, sprites]);


    const handleOnSetZPos = (newZPos: number) => {
        if (newZPos < 0) newZPos = 0;
        setZPos(newZPos);
    }

    return { zPos, setZPos: handleOnSetZPos, traveledPercentage };
}

export default useTravelPosition;