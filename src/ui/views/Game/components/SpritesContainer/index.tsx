import React from 'react';
import style from './style.module.css';
import useSprites from '@hooks/useSprites';
import Sprite from '../Sprite';

export const spritesContainerContext = React.createContext({} as any)

const SpriteContainer = () => {
    const spriteContainerRef = React.useRef<HTMLDivElement>(null);
    const [containerSize, setContainerSize] = React.useState<{width: number, height: number}>({width: 0, height: 0});
    const {sprites} = useSprites()

    React.useEffect(()=>{
        if(!spriteContainerRef.current) return;
        const resizeObserver = new ResizeObserver((entries)=>{
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                setContainerSize({width, height});
            }
        });
        resizeObserver.observe(spriteContainerRef.current);
        return () => resizeObserver.disconnect();
    }, [])

    const centerSprite = ({width, height}: {width: number, height: number})=>{
        //centers the sprite based on its width and height in this container
        if(!spriteContainerRef.current) return;
        const containerWidth = spriteContainerRef.current.clientWidth;
        const containerHeight = spriteContainerRef.current.clientHeight;
        const xPos = (containerWidth / 2) - (width / 2);
        const yPos = (containerHeight / 2) - (height / 2);
        return {xPos, yPos};
    }

    return ( 
        <spritesContainerContext.Provider value={{sprites, centerSprite, containerSize}}>
        <div
            ref={spriteContainerRef}
            className={style.spriteContainer}>
            {
                sprites?.map((spriteData, index)=>{
                    return (
                        <Sprite 
                            key={spriteData.id} 
                            index={index}
                            data={spriteData} />
                    )
                })
            }
        </div>
        </spritesContainerContext.Provider>
     );
}
 
export default SpriteContainer;