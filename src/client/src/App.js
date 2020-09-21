import React, { useEffect } from 'react'
import Header from './components/Header/Header';
import socketIOClient from "socket.io-client";
import {URL} from './configs';

export default function App() {
    useEffect(() => {
        const socket = socketIOClient(URL);
        socket.on('sayHi', (message) => {
            console.log(message);
            // fetch chats and messages for user and save them as state
        });

        // clean up when done
        return () => socket.disconnect();
    }, []);
    return (
        <div>
            <Header/>
        </div>
    )
}
