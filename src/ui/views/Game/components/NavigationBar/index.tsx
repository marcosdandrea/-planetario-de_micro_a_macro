import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './style.module.css';
import Indicator from './components/Indicator';
import { GameContext } from '@contexts/GameContext';

const NavigationBar = () => {
    const indicatorRef = useRef<HTMLDivElement>(null);
    const {zPos, distanceBetweenSprites, sprites} = useContext(GameContext);
    
    useEffect(()=>{
        if (!sprites?.length) return;
        if (!indicatorRef.current) return

        const indicatorWidth = indicatorRef.current.offsetWidth;
        const navigationBarWidth = indicatorRef.current.parentElement?.offsetWidth || 0;
        const totalLength = distanceBetweenSprites * (sprites.length - 1);
        const clampedZPos = Math.min(Math.max(zPos, 0), totalLength);
        
        // Calcular el porcentaje de posición
        const progress = clampedZPos / totalLength;
        
        // Calcular la posición máxima considerando el ancho del indicador
        const maxPosition = navigationBarWidth - indicatorWidth;
        const indicatorX = progress * maxPosition;

        indicatorRef.current.style.left = `${indicatorX}px`;

    }, [zPos, distanceBetweenSprites, sprites]);

    return ( 
    <div 
        className={styles.navigationBar}>
        <Indicator ref={indicatorRef} />
    </div>);
}
 
export default NavigationBar;