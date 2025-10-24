import React from 'react';
import style from './style.module.css';
import FallbackNoSprites from "../FallbackNoSprites";
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import SpriteContainer from "../SpritesContainer";
import BackgroundContainer from "../BackgroundContainer";
import useSprites from '@hooks/useSprites';
import { events } from '@common/events';

const Game = () => {
    const {sprites} = useSprites({updateOnEvents:[
        events.spriteCreated,
        events.spriteDeleted,
        events.spriteUpdated,
    ]});

    if (sprites?.length === 0)
        return (<FallbackNoSprites />);
    else
        return (
            <div className={style.Game}>
                <Header />
                <NavigationBar />
                <SpriteContainer />
                <BackgroundContainer />
            </div>
        );
}

export default Game;