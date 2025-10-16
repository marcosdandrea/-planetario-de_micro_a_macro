import React, { useContext, useEffect, useRef } from "react";
import useTravelPosition from "@hooks/useTravelPosition";
import { GameContext } from "@contexts/GameContext";
import style from './style.module.css';

const TravelControl = ({ children }) => {
    const travelControlRef = useRef(null);
    const {zMax, travelSpeed } = useContext(GameContext);
    const { zPos, setZPos } = useTravelPosition();

    useEffect(() => {
        if (!travelControlRef.current) return;
        const handleWheel = (event: WheelEvent) => {
            let newZPos = zPos + event.deltaY * travelSpeed;
            if (newZPos < 1000) newZPos = 1000;
            if (newZPos > zMax * 0.95) newZPos = zMax * 0.95;
            setZPos(newZPos);
        }

        travelControlRef.current.addEventListener("wheel", handleWheel);

        return () => {
            travelControlRef.current.removeEventListener("wheel", handleWheel);
        }

    }, [travelControlRef, zPos, setZPos])

    return (
        <div
            className={style.travelControl} 
            ref={travelControlRef}>
            {children}
        </div>
    );
}

export default TravelControl;