import React, { useContext, useEffect, useRef } from "react";
import useTravelPosition from "@hooks/useTravelPosition";
import { GameContext } from "@contexts/GameContext";

const TravelControl = ({ children }) => {
    const travelControlRef = useRef(null);
    const { stepsBetweenSprites, zMax, travelSpeed } = useContext(GameContext);
    const { zPos, setZPos } = useTravelPosition();

    useEffect(() => {
        if (!travelControlRef.current) return;
        const handleWheel = (event: WheelEvent) => {
            let newZPos = zPos + event.deltaY * travelSpeed;
            if (newZPos < 1000) newZPos = 1000;
            if (newZPos > zMax * 0.94) newZPos = zMax * 0.94;
            setZPos(newZPos);
        }

        travelControlRef.current.addEventListener("wheel", handleWheel);

        return () => {
            travelControlRef.current.removeEventListener("wheel", handleWheel);
        }

    }, [travelControlRef, zPos, setZPos])

    return (
        <div ref={travelControlRef}>
            {children}
        </div>
    );
}

export default TravelControl;