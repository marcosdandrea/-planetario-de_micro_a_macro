import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';
import useTravellingSpeed from '@hooks/useTravellingSpeed';

const Particles = () => {
    const videoForwardRef = useRef<HTMLVideoElement>(null);
    const videoBackwardRef = useRef<HTMLVideoElement>(null);
    const { speed, direction } = useTravellingSpeed();

    useEffect(() => {
        if (videoForwardRef.current && videoBackwardRef.current) {
            // Normalizar speed (0-10) a playbackRate (0.1-2)
            const playbackRate = Math.max(0.1, (speed / 10) * 2);
            
            videoForwardRef.current.playbackRate = playbackRate;
            videoBackwardRef.current.playbackRate = playbackRate;
            
            // Controlar opacidad según dirección
            if (direction > 0) {
                // Movimiento positivo: mostrar video forward
                videoForwardRef.current.style.opacity = '1';
                videoBackwardRef.current.style.opacity = '0';
            } else if (direction < 0) {
                // Movimiento negativo: mostrar video backward
                videoForwardRef.current.style.opacity = '0';
                videoBackwardRef.current.style.opacity = '1';
            } else {
                // Sin movimiento: fade out ambos
                videoForwardRef.current.style.opacity = '0';
                videoBackwardRef.current.style.opacity = '0';
            }
        }
    }, [speed, direction]);

    return (
        <div className={styles.particles}>
            <video 
                ref={videoForwardRef}
                autoPlay 
                loop
                muted 
                className={styles.video}
                style={{ transition: 'opacity 1s ease' }}>
                <source src="/resources/video/particles.webm" type="video/webm" />
            </video>
            <video 
                ref={videoBackwardRef}
                autoPlay 
                loop
                muted 
                className={styles.video}
                style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transition: 'opacity 1s ease'
                }}>
                <source src="/resources/video/particles-reverse.webm" type="video/webm" />
            </video>
        </div>);
}

export default Particles;