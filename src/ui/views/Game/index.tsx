import React from 'react';
import style from './style.module.css';
import TravelControl from '@components/TravelControl';
import SpriteContainer from './components/SpritesContainer';
import BackgroundContainer from './components/BackgroundContainer';
import NavigationBar from './components/NavigationBar';
import Header from './components/Header';
import AspectRatio from '@components/AspectRatio';
import GameContextProvider from '@contexts/GameContext';

const Game = () => {
    return (
        <GameContextProvider
            autoResetTimeout={120000}>
            <TravelControl>
                <AspectRatio aspectRatio={9 / 16}>
                    <div className={style.Game}>
                        <Header />
                        <NavigationBar />
                        <SpriteContainer />
                        <BackgroundContainer />
                    </div>
                </AspectRatio>
            </TravelControl>
        </GameContextProvider>
    );
}

export default Game;
