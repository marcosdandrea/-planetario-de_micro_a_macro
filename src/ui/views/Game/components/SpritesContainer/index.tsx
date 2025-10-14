import React from 'react';
import style from './style.module.css';
import useSprites from '@hooks/useSprites';
import Sprite from '../Sprite';

const SpriteContainer = () => {
    const {sprites} = useSprites()

    return ( 
        <div className={style.spriteContainer}>
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
     );
}
 
export default SpriteContainer;