import React, { forwardRef, useContext, useEffect, useState } from 'react';
import styles from './style.module.css';
import Text from '@components/Text';
import useTravelPosition from '@hooks/useTravelPosition';
import { GameContext } from '@contexts/GameContext';

type valueStepsType = {
    numericDistance: number;
    unit: string;
    zPos: number;
}

type currentStepType = {
    numericDistance: number | string;
    unit: string;
    zPos: number;
}

const Indicator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((_props, ref) => {
    const { zPos } = useTravelPosition()
    const { sprites, distanceBetweenSprites, units } = useContext(GameContext)
    const [valueSteps, setValueSteps] = useState<valueStepsType[]>([]);
    const [currentStep, setCurrentStep] = useState<currentStepType | null>({ numericDistance: 0, unit: '', zPos: 0 });
    
    useEffect(() => {
        if (!sprites || !units) return;

        const valueSteps = sprites.map((sprite, index) => {
            // Encuentra la unidad correspondiente
            const unitData = units.find(u => u.name === sprite.unit);
            
            // Convierte base10Size (en metros) a la unidad del sprite
            const numericDistance = unitData 
                ? unitData.fromBase10(sprite.base10Size)
                : sprite.base10Size;

            return {
                numericDistance,
                unit: sprite.unit,
                zPos: index * distanceBetweenSprites
            }
        })

        setValueSteps(valueSteps)

    }, [zPos, sprites, distanceBetweenSprites, units]);

    useEffect(() => {
        if (valueSteps.length === 0) return;

        // Encuentra los dos steps más cercanos para interpolar entre ellos
        let prevStep = valueSteps[0];
        let nextStep = valueSteps[valueSteps.length - 1];

        // Busca los steps anterior y siguiente a la posición actual
        for (let i = 0; i < valueSteps.length - 1; i++) {
            if (zPos >= valueSteps[i].zPos && zPos <= valueSteps[i + 1].zPos) {
                prevStep = valueSteps[i];
                nextStep = valueSteps[i + 1];
                break;
            }
        }

        // Si estamos antes del primer step
        if (zPos < valueSteps[0].zPos) {
            prevStep = valueSteps[0];
            nextStep = valueSteps[1] || valueSteps[0];
        }
        // Si estamos después del último step
        else if (zPos > valueSteps[valueSteps.length - 1].zPos) {
            prevStep = valueSteps[valueSteps.length - 2] || valueSteps[valueSteps.length - 1];
            nextStep = valueSteps[valueSteps.length - 1];
        }

        // Calcula el factor de interpolación (0 a 1)
        const totalDistance = nextStep.zPos - prevStep.zPos;
        const currentDistance = zPos - prevStep.zPos;
        const interpolationFactor = totalDistance === 0 ? 0 : Math.max(0, Math.min(1, currentDistance / totalDistance));

        // Mantiene la unidad del step previo hasta alcanzar el siguiente
        const currentUnit = prevStep.unit;
        
        // Para interpolación, necesitamos convertir ambos valores a la misma unidad
        const currentUnitData = units?.find(u => u.name === currentUnit);
        const prevUnitData = units?.find(u => u.name === prevStep.unit);
        const nextUnitData = units?.find(u => u.name === nextStep.unit);
        
        let prevValueInCurrentUnit = prevStep.numericDistance;
        let nextValueInCurrentUnit = nextStep.numericDistance;
        
        // Si las unidades son diferentes, convertir nextStep a la unidad actual
        if (prevStep.unit !== nextStep.unit && currentUnitData && nextUnitData) {
            // Convertir nextStep de su unidad a metros (base10), luego a la unidad actual
            const nextInBase10 = nextUnitData.toBase10(nextStep.numericDistance);
            nextValueInCurrentUnit = currentUnitData.fromBase10(nextInBase10);
        }

        // Interpola el valor numérico (logarítmico para escalas científicas)
        const logPrev = Math.log10(Math.max(prevValueInCurrentUnit, 1e-15)); // Evita log de 0
        const logNext = Math.log10(Math.max(nextValueInCurrentUnit, 1e-15)); // Evita log de 0
        const interpolatedLog = logPrev + (logNext - logPrev) * interpolationFactor;
        const interpolatedValue = Math.pow(10, interpolatedLog);

        // Función para formatear números al estilo argentino (punto para miles, coma para decimales)
        const formatArgentineNumber = (value: number): string => {
            let formattedString: string;
            
            // Determinar precisión según magnitud
            if (value >= 1) {
                formattedString = value.toFixed(2);
            } else if (value >= 0.01) {
                formattedString = value.toFixed(3);
            } else if (value >= 0.001) {
                formattedString = value.toFixed(4);
            } else {
                // Para valores muy pequeños, usar notación científica
                formattedString = value.toExponential(2);
                // Formatear la notación científica también
                return formattedString.replace('.', ',');
            }
            
            // Separar parte entera y decimal
            const [integerPart, decimalPart] = formattedString.split('.');
            
            // Formatear parte entera con puntos para miles
            const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            
            // Unir con coma decimal si hay parte decimal
            return decimalPart ? `${formattedInteger},${decimalPart}` : formattedInteger;
        };

        const formattedValue = formatArgentineNumber(interpolatedValue);

        setCurrentStep({
            numericDistance: formattedValue as any, // Mantenemos como string formateado
            unit: currentUnit,
            zPos: zPos
        });

    }, [zPos, valueSteps]);

    if (!currentStep) return null;

    return (
        <div
            ref={ref}
            className={styles.indicator} >
            <Text>
                {currentStep.numericDistance}
            </Text>
            <Text>
                {currentStep.unit}
            </Text>

        </div>
    );
})

export default Indicator;