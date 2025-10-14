import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Game from '@views/Game';

const Navigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Game />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Navigation;