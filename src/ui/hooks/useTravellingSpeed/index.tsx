import { useContext, useEffect, useRef, useState } from 'react';
import { GameContext } from '@contexts/GameContext';

interface UseTravellingSpeedOptions {
    maxSpeed?: number;
    sampleInterval?: number; // ms entre muestras
    sensitivity?: number; // Factor de escala (menor = menos sensible)
    inactivityDelay?: number; // ms sin movimiento antes de iniciar deceleración
    decelerationTime?: number; // ms para volver a 0 gradualmente
}

const useTravellingSpeed = (options: UseTravellingSpeedOptions = {}) => {
    const { 
        maxSpeed = 10, 
        sampleInterval = 16, 
        sensitivity = 0.0003,
        inactivityDelay = 200, // Esperar 200ms sin movimiento
        decelerationTime = 1500 // Decelerar en 1500ms
    } = options;
    const { zPos } = useContext(GameContext);
    
    const [speed, setSpeed] = useState<number>(0);
    const [direction, setDirection] = useState<1 | -1 | 0>(0); // 1: positivo, -1: negativo, 0: sin movimiento
    const prevZPosRef = useRef<number>(zPos);
    const prevTimeRef = useRef<number>(Date.now());
    const inactivityTimeoutRef = useRef<number | null>(null);
    const decelerationIntervalRef = useRef<number | null>(null);
    const lastSpeedRef = useRef<number>(0);
    const lastDirectionRef = useRef<1 | -1 | 0>(0);
    
    useEffect(() => {
        const currentTime = Date.now();
        const deltaTime = currentTime - prevTimeRef.current;
        
        // Limpiar timeouts/intervalos anteriores
        if (inactivityTimeoutRef.current) {
            clearTimeout(inactivityTimeoutRef.current);
            inactivityTimeoutRef.current = null;
        }
        if (decelerationIntervalRef.current) {
            clearInterval(decelerationIntervalRef.current);
            decelerationIntervalRef.current = null;
        }
        
        // Solo calcular si ha pasado el intervalo mínimo
        if (deltaTime >= sampleInterval) {
            const deltaZPos = zPos - prevZPosRef.current;
            
            if (deltaZPos !== 0) {
                // Hay movimiento: calcular dirección y velocidad
                const newDirection = deltaZPos > 0 ? 1 : -1;
                setDirection(newDirection);
                lastDirectionRef.current = newDirection;
                
                const rawSpeed = (Math.abs(deltaZPos) / deltaTime) * 1000 * sensitivity;
                const normalizedSpeed = Math.min(rawSpeed, maxSpeed);
                
                setSpeed(normalizedSpeed);
                lastSpeedRef.current = normalizedSpeed;
            }
            
            prevZPosRef.current = zPos;
            prevTimeRef.current = currentTime;
        }
        
        // Siempre iniciar timeout de inactividad si hay velocidad
        if (lastSpeedRef.current > 0) {
            inactivityTimeoutRef.current = window.setTimeout(() => {
                startDeceleration();
            }, inactivityDelay);
        }
        
        return () => {
            if (inactivityTimeoutRef.current) {
                clearTimeout(inactivityTimeoutRef.current);
            }
            if (decelerationIntervalRef.current) {
                clearInterval(decelerationIntervalRef.current);
            }
        };
    }, [zPos, sampleInterval, maxSpeed, sensitivity, inactivityDelay]);
    
    const startDeceleration = () => {
        const decelerationSteps = decelerationTime / sampleInterval;
        const initialSpeed = lastSpeedRef.current;
        let currentStep = 0;
        
        decelerationIntervalRef.current = window.setInterval(() => {
            currentStep++;
            
            if (currentStep >= decelerationSteps) {
                setSpeed(0);
                setDirection(0);
                lastSpeedRef.current = 0;
                lastDirectionRef.current = 0;
                if (decelerationIntervalRef.current) {
                    clearInterval(decelerationIntervalRef.current);
                    decelerationIntervalRef.current = null;
                }
            } else {
                // Deceleración lineal
                const newSpeed = initialSpeed * (1 - currentStep / decelerationSteps);
                setSpeed(newSpeed);
                lastSpeedRef.current = newSpeed;
            }
        }, sampleInterval);
    };
    
    return { speed, direction };
}
 
export default useTravellingSpeed;