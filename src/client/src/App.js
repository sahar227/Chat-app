import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header';
import socketIOClient from "socket.io-client";
import {URL} from './configs';

export default function App() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        if(!token)
            return;
        const socket = socketIOClient(URL);
        socket.on('requestAuth', () => {
            socket.emit('authenticate', token);
        });
        socket.on('authFailed', () => {
            console.log('auth failed');
        });
        socket.on('authSuccess', () => {
            console.log('auth success');
        });

        // clean up when done
        return () => socket.disconnect();
    }, [token]);
    return (
        <div>
            <Header token={token} setToken={setToken}/>
        </div>
    )
}
