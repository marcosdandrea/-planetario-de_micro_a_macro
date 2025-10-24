import React, { useEffect, useState } from "react";
import style from './style.module.css';
import Background from "../Background";
import useBackgrounds from "@hooks/useBackgrounds";
import { backgroundType } from "@common/types/background.type";

interface LocalBgs extends backgroundType {
    index: number;
}

const BackgroundContainer = () => {
    const { backgrounds } = useBackgrounds();
    const [localBgs, setLocalBgs] = useState<LocalBgs[]>([]);

    useEffect(()=>{
        if(!backgrounds) return;
        //rewrite the array filtering repeated images and adding the index value to each entry
        const indexedBgs = backgrounds.map((bg, index) => ({...bg, index}));
        const uniqueBgs = indexedBgs.filter((bg, index, self) =>
            index === self.findIndex((t) => (
                t.image === bg.image
            ))
        );
        setLocalBgs(uniqueBgs);
    }, [backgrounds]);

    if(!localBgs || localBgs.length === 0) return null;
    return (
        <div className={style.backgroundsContainer}>
            {localBgs.map((data, index) => (
                <Background 
                    index={data.index}
                    key={index} 
                    data={data} />
            ))}
        </div>
    );
}
 
export default BackgroundContainer;