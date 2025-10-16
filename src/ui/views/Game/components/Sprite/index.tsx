import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import style from './style.module.css';
import Image from "@components/Image";
import { SpriteType } from '@common/types/sprite.type';
import useTravelPosition from '@hooks/useTravelPosition';
import { GameContext } from '@contexts/GameContext';
import Labels from '../Labels';
import SpriteContainer, { spritesContainerContext } from '../SpritesContainer';
import LabelContainer from '../LabelContainer';

const Sprite = ({ data, index }: { data: SpriteType, index: number }) => {
    const spriteRef = useRef<HTMLDivElement>(null);
    const { zPos: travelPositionZ } = useTravelPosition()
    const { distanceBetweenSprites, cameraFocusRange, cullingDistance, units } = useContext(GameContext)
    const { centerSprite, containerSize } = useContext(spritesContainerContext);

    const [image, setImage] = useState(data.image);
    const [xPos, setXPos] = useState(0);
    const [yPos, setYPos] = useState(0);
    const [zPos, setZPos] = useState(0);
    const [zPosOffset, setZPosOffset] = useState(0);
    const [displaySize, updateDisplaySize] = useState("");

    const shouldCenter = useMemo(() => {
        const isIndex = data.isIndex || false;
        return index == 0 || isIndex;
    }, [index, data.isIndex]);

    const isOdd = index % 2 !== 0;

    // Calcular distancia a la cámara
    const distanceToCamera = useMemo(() => {
        return Math.abs(zPos - travelPositionZ);
    }, [zPos, travelPositionZ]);

    // Calcular blur amount usando useMemo
    const blurAmount = useMemo(() => {
        if (!cameraFocusRange) return 0;
        
        if (distanceToCamera < cameraFocusRange[0]) {
            return 0;
        } else if (distanceToCamera > cameraFocusRange[1]) {
            return 30;
        } else {
            const range = cameraFocusRange[1] - cameraFocusRange[0];
            const distanceInRange = distanceToCamera - cameraFocusRange[0];
            return (distanceInRange / range) * 30;
        }
    }, [distanceToCamera, cameraFocusRange]);

    // Calcular opacity usando useMemo
    const opacity = useMemo(() => {
        if (!cullingDistance) return 1;
        
        const fadeStartPercent = 0.4;
        if (distanceToCamera < cullingDistance * fadeStartPercent) {
            return 1;
        } else if (distanceToCamera > cullingDistance) {
            return 0;
        } else {
            const range = cullingDistance * fadeStartPercent;
            const distanceInRange = distanceToCamera - range;
            return 1 - (distanceInRange / range);
        }
    }, [distanceToCamera, cullingDistance]);

    useEffect(() => {
        const newZPosOffset = zPos - travelPositionZ;
        setZPosOffset(newZPosOffset);
    }, [zPos, travelPositionZ]);

    const getRandomOffset = ({ maxOffset, blindRange }: { maxOffset: number; blindRange?: [number, number] }) => {
        //should return a random offset between -maxOffset and maxOffset, but not within the blindRange
        const min = -maxOffset;
        const max = maxOffset;
        let randomOffset;
        do {
            randomOffset = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (randomOffset > (blindRange ? blindRange[0] : 0) && randomOffset < (blindRange ? blindRange[1] : 0));
        return randomOffset;
    }

    const setDisplaySize = () => {
        if (!units || units.length === 0) {
            updateDisplaySize(data.displaySize);
            return;
        }
        const unitObj = units.find(u => u.name === data.unit);
        if (!unitObj) {
            updateDisplaySize(data.displaySize);
            return;
        }
        const convertedSize = unitObj.fromBase10(data.base10Size);
        const roundedSize = Math.round(convertedSize * 100) / 100;
        updateDisplaySize(roundedSize.toString());
        updateDisplaySize(`${roundedSize} ${unitObj.symbol}`);
    }

    // ResizeObserver para centrar automáticamente cuando sea necesario
    useEffect(() => {
        if (!spriteRef.current || !image) return;

        setDisplaySize();

        // ResizeObserver para sprites que necesitan centrarse
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;

                console.log ("Sprite resized", { width, height });
                
                if (width > 0 && height > 0) {
                    const { yPos, xPos } = centerSprite({ width, height });

                    
                    if (shouldCenter) {
                        setXPos(xPos);
                        setYPos(yPos);
                    } else {
                        setYPos(yPos + getRandomOffset({ maxOffset: containerSize.height }));
                        setXPos(xPos + getRandomOffset({ maxOffset: containerSize.width, blindRange: [-50, 50] }));
                    }

                    setZPos(index * distanceBetweenSprites);
                }
            }
        });

        resizeObserver.observe(spriteRef.current);

        return () => resizeObserver.disconnect();
    }, [image, index, data.isIndex, distanceBetweenSprites, shouldCenter])

    useEffect(() => {
        if (!data || !data.image) return;
        setImage(`http://localhost:3000/database/${data.image}`);
    }, [data, spriteRef]);

    return (
        <div
            ref={spriteRef}
            className={style.sprite}
            style={{
                transform: `translate3D(${xPos}px, ${yPos}px, ${zPosOffset}px)`,
                opacity: opacity,
                flexDirection: isOdd ? 'row-reverse' : 'row'
            }}>
            {
               <LabelContainer style={{ opacity: blurAmount > 10 ? opacity * 0.4 : opacity }}>
                 <Labels
                       alignment={!isOdd ? 'right' : (xPos < 0 ? 'left' : 'center')}
                        title={data.displayName}
                        subtitle={data.description}
                        displaySize={displaySize} />
                </LabelContainer>
            }
            {
                opacity > 0 &&
                <div style={{ filter: `blur(${blurAmount}px)` }}>
                    <Image
                        src={image}
                        width={1000}
                        height={1000} />
                </div>
            }
        </div>
    );
}

export default Sprite;