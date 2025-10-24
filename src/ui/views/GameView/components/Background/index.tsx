import React, { useContext, useEffect, useState } from 'react';
import styles from './style.module.css';
import { backgroundType } from '@common/types/background.type';
import useTravelPosition from '@hooks/useTravelPosition';
import { GameContext } from '@contexts/GameContext';

const Background = ({ data, index }: { data: backgroundType, index: number }) => {
    const [opacity, setOpacity] = useState(1);
    const {distanceBetweenSprites} = useContext(GameContext)
    const {zPos, traveledPercentage} = useTravelPosition()
    const [scale, setScale] = useState(2);

    useEffect(() => {
        setScale(2 - traveledPercentage);
    }, [traveledPercentage])


    useEffect(()=> {
        const bgPosition = index * distanceBetweenSprites;
        if (zPos < bgPosition) {
            setOpacity(0);
            return;
        }
        if(zPos > bgPosition){
            setOpacity(1);
            return;
        }        
       
    }, [zPos, distanceBetweenSprites, index])

    return (
        <div
            style={{
                backgroundImage: `url(http://localhost:3000/database/${data.image})`,
                opacity,
                transform: `scale(${scale})`
            }}
            className={styles.background}>
        </div>
    );
}

export default Background;
           