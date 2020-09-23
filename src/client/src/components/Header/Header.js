import './Header.css';
import LoginButton from './LoginButton';
import React from 'react';

export default () => {
    return (
        <div className="header-container">
            <h1>CHAT-APP</h1>
            <LoginButton/>
        </div>
    )
}