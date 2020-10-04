import React, { useEffect } from 'react';
import { URL } from '../../configs';
import Cookies from 'js-cookie';

const LoginButton = ({token, setToken}) => {
    useEffect(() => {
        const jwtToken = Cookies.get('jwt');
        setToken(jwtToken);
    });

    if(!token)
        return <a href={`${URL}/api/auth/google`} className="login-btn">Log in</a>;
    return (
            <a href="/" onClick={() => Cookies.remove('jwt')} className="login-btn">Log out</a>
    
    );
}
export default LoginButton;
