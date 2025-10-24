import React from 'react';
import TravelControl from '@components/TravelControl';
import AspectRatio from '@components/AspectRatio';
import GameContextProvider from '@contexts/GameContext';
import Game from './components/Game';

const GameView = () => {
    return (
        <GameContextProvider
            autoResetTimeout={120000}>
            <TravelControl>
                <AspectRatio aspectRatio={9 / 16}>
                    <Game/>
                </AspectRatio>
            </TravelControl>
        </GameContextProvider>
    );
}

export default GameView;
