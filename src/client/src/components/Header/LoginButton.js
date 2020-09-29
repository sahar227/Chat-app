import React from 'react';
import {URL} from '../../configs';
import Cookies from 'js-cookie';

const renderLoginOrLogOut = () => {
    if(!Cookies.get('jwt'))
        return <a href={`${URL}/api/auth/google`} className="login-btn">Log in</a>;
    return (
            <a href="/" onClick={() => Cookies.remove('jwt')} className="login-btn">Log out</a>
    
    );
}
export default function LoginButton() {
    return (
        renderLoginOrLogOut()
    );
}
