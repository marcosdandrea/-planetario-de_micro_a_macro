import React from 'react';
import style from './style.module.css';
import TravelControl from '@components/TravelControl';
import GameContextProvider from '@contexts/GameContext';
import SpriteContainer from './components/SpritesContainer';
import BackgroundContainer from './components/BackgroundContainer';
import NavigationBar from './components/NavigationBar';

const Game = () => {
    return (
        <GameContextProvider>
            <TravelControl>
                <div className={style.Game}>
                    <NavigationBar/>
                    <SpriteContainer />
                    <BackgroundContainer />
                </div>
            </TravelControl>
        </GameContextProvider>
    );
}

export default Game;