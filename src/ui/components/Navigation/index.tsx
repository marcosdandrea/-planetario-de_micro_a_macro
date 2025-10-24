import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import GameView from '@views/GameView';
import Panel from '@views/Panel';

const Navigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GameView />} />
                <Route path="/panel" element={<Panel />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Navigation;