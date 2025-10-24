import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './style.module.css';
import Indicator from './components/Indicator';
import { GameContext } from '@contexts/GameContext';

const NavigationBar = () => {
    const indicatorRef = useRef<HTMLDivElement>(null);
    const {zPos, distanceBetweenSprites, sprites, minLimit, maxLimit} = useContext(GameContext);
    
    useEffect(()=>{
        if (!sprites?.length) return;
        if (!indicatorRef.current) return
        if (minLimit === undefined || maxLimit === undefined) return;

        const indicatorWidth = indicatorRef.current.offsetWidth;
        const navigationBarWidth = indicatorRef.current.parentElement?.offsetWidth || 0;
        
        // Calcular el rango basado en los límites
        const rangeLength = maxLimit - minLimit;
        const clampedZPos = Math.min(Math.max(zPos, minLimit), maxLimit);
        
        // Calcular el porcentaje de posición dentro del rango de límites
        const progress = (clampedZPos - minLimit) / rangeLength;
        
        // Como el indicador usa transform: translateX(-50%), su punto de referencia es el centro
        // Por lo tanto, debe moverse desde indicatorWidth/2 hasta navigationBarWidth - indicatorWidth/2
        const minPosition = indicatorWidth / 2;
        const maxPosition = navigationBarWidth - (indicatorWidth / 2);
        const indicatorX = minPosition + (progress * (maxPosition - minPosition));

        indicatorRef.current.style.left = `${indicatorX}px`;

    }, [zPos, distanceBetweenSprites, sprites, minLimit, maxLimit]);

    return ( 
    <div 
        className={styles.navigationBar}>
        <Indicator ref={indicatorRef} />
    </div>);
}
 
export default NavigationBar;