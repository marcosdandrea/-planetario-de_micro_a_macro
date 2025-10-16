import React from 'react';
import SocketContextProvider from './contexts/socket';
import Navigation from './components/Navigation';
import AspectRatio from '@components/AspectRatio';

function App() {

    return (
        <SocketContextProvider>
            <AspectRatio aspectRatio={9/16}>
                <Navigation />
            </AspectRatio>
        </SocketContextProvider>
    );
}

export default App;
