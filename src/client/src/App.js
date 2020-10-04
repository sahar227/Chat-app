import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header';
import socketIOClient from "socket.io-client";
import {URL} from './configs';
import ChatList from './components/ChatList/ChatList';
import ChatRoom from './components/ChatRoom/ChatRoom';


const chats = [
    {
        id: 1,
        roomName: 'first',
        lastMessage: {
            author: 'sahar',
            content: 'my message'
        }
    },
    {
        id: 2,
        roomName: 'second',
        lastMessage: {
            author: 'sahar2',
            content: 'my message2'
        }
    }
];
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
            <div style={{display:"flex"}}>
                <ChatList availableChats={chats}/>
                <ChatRoom/>
            </div>
        </div>

    )
}
