import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Game from '@views/Game';
import Panel from '@views/Panel';

const Navigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Game />} />
                <Route path="/panel" element={<Panel />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Navigation;