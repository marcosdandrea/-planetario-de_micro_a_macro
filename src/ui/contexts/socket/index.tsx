import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { createContext } from "react";

export const SocketContext = createContext<any>(null);

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState<any>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [socketUrl, setSocketUrl] = useState<string>('');

    useEffect(() => {
        const initializeSocket = async () => {
            // Detectar si estamos en desarrollo basándonos en el puerto actual
            const currentPort = window.location.port;
            let url: string;
            
            if (currentPort === '5123') {
                url = 'http://localhost:3000';
            } else {
                // En producción, conectar al mismo host y puerto desde donde se sirve la página
                url = `${window.location.protocol}//${window.location.host}`;
            }
            
            setSocketUrl(url);
            
            const newSocket = io(url, {
                transports: ['websocket', 'polling'],
                timeout: 5000,
                forceNew: true
            });
            
            setSocket(newSocket);
            setIsConnected(newSocket.connected);
        };

        initializeSocket();
    }, []);

    const refreshLocation = () => {
        location.reload();
    }

    useEffect(() => {
        if (!socket) return;

        const handleConnect = () => {
            setIsConnected(true);
            console.log(`Socket connected`);
        };

        const handleDisconnect = (reason: string) => {
            setIsConnected(false);
            console.log("Socket disconnected:", reason);
        };

        const handleConnectError = (error: any) => {
            console.error("Socket connection error:", error.message);
            // Si es un error de acceso denegado (isolation), informar al usuario
            if (error.message.includes('Access denied')) {
                console.error("Server isolation is enabled - connection rejected");
            }
        };

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        socket.on("connect_error", handleConnectError);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("connect_error", handleConnectError);
        };
    }, [socket, socketUrl]);

    // Cleanup cuando el componente se desmonte
    useEffect(() => {
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    return ( 
        <SocketContext.Provider value={{socket, isConnected}}>
            {children}
        </SocketContext.Provider>
     );
}



export default SocketContextProvider;
