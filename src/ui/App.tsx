import React from 'react';
import SocketContextProvider from './contexts/socket';
import Navigation from './components/Navigation';

function App() {

    return (
        <SocketContextProvider>
            <Navigation />
        </SocketContextProvider>
    );
}

export default App;
