import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './style.module.css';
import Image from "@components/Image";
import { SpriteType } from '@common/types/sprite.type';
import useTravelPosition from '@hooks/useTravelPosition';
import { GameContext } from '@contexts/GameContext';
import Labels from './Labels';

const Sprite = ({ data, index }: { data: SpriteType, index: number }) => {
    const spriteRef = useRef<HTMLDivElement>(null);
    const { zPos: travelPositionZ } = useTravelPosition()
    const { distanceBetweenSprites, cameraFocusRange, cullingDistance } = useContext(GameContext)

    const [image, setImage] = useState(data.image);
    const [displayName, setDisplayName] = useState(data.displayName || "");
    const [description, setDescription] = useState(data.description || "");
    const [xPos, setXPos] = useState(0);
    const [yPos, setYPos] = useState(0);
    const [zPos, setZPos] = useState(0);
    const [zPosOffset, setZPosOffset] = useState(0);
    const [distanceToCamera, setDistanceToCamera] = useState(0);
    const [blurAmount, setBlurAmount] = useState(0);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        setZPosOffset(zPos - travelPositionZ);
        setDistanceToCamera(Math.abs(zPos - travelPositionZ));
        if (cameraFocusRange) {
            if (distanceToCamera < cameraFocusRange[0]) {
                setBlurAmount(0);
            } else if (distanceToCamera > cameraFocusRange[1]) {
                setBlurAmount(30);
            } else {
                const range = cameraFocusRange[1] - cameraFocusRange[0];
                const distanceInRange = distanceToCamera - cameraFocusRange[0];
                const blur = (distanceInRange / range) * 30;
                setBlurAmount(blur);
            }
        }

        //it starts to fade out at 50% of the culling distance, and is fully invisible at the culling distance
        const fadeStartPercent = 0.4;
        if (cullingDistance) {
            if (distanceToCamera < cullingDistance * fadeStartPercent) {
                setOpacity(1);
            } else if (distanceToCamera > cullingDistance) {
                setOpacity(0);
            } else {
                const range = cullingDistance * fadeStartPercent;
                const distanceInRange = distanceToCamera - range;
                const newOpacity = 1 - (distanceInRange / range);
                setOpacity(newOpacity);
            }
        }
    }, [travelPositionZ, cameraFocusRange, distanceToCamera, cullingDistance]);

    const centerImageOnScreen = () => {
        const width = spriteRef.current?.offsetWidth || 1000;
        const height = spriteRef.current?.offsetHeight || 1000;
        return ({
            x: (window.innerWidth / 2) - (width / 2),
            y: (window.innerHeight / 2) - (height / 2)
        });
    }

    const getRandomYOffset = ({ maxOffset, blindRange }: { maxOffset: number; blindRange?: [number, number] }) => {
        //should return a random offset between -maxOffset and maxOffset, but not within the blindRange
        const min = -maxOffset;
        const max = maxOffset;
        let randomOffset;
        do {
            randomOffset = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (randomOffset > (blindRange ? blindRange[0] : 0) && randomOffset < (blindRange ? blindRange[1] : 0));
        return randomOffset;
    }

    useEffect(()=>{
        if (!spriteRef.current) return;
        if (!image) return;
        const { x, y } = centerImageOnScreen();
        const isIndex = data.isIndex || false;
        setXPos(index == 0 || isIndex ? x : index % 2 == 0
            ? 100
            : -100);
        setYPos(index == 0 || isIndex ? y : y + getRandomYOffset({ maxOffset: 1000 }));
        setZPos(index * distanceBetweenSprites);
    }, [image, spriteRef])

    useEffect(() => {
        if (!data || !data.image) return;
        setImage(`http://localhost:3000/database/${data.image}`);
        setDisplayName(data.displayName || "");
        setDescription(data.description || "")
    }, [data, spriteRef]);


    return (
        <div
            ref={spriteRef}
            className={style.sprite}
            style={{
                transform: `translate3D(${xPos}px, ${yPos}px, ${zPosOffset}px)`,
                opacity: opacity,
                flexDirection: xPos < 0 ? 'row-reverse' : 'row'
            }}>
            {
                <div
                    className={style.labelsContainer}
                    style={{ opacity: blurAmount > 10 ? opacity * 0.4 : opacity }}>
                    <Labels
                        alignment={xPos > 0 ? 'right' : (xPos < 0 ? 'left' : 'center')}
                        title={data.displayName}
                        subtitle={data.description}
                        displaySize={data.displaySize} />

                </div>
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