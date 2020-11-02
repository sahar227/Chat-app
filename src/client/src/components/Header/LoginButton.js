import React, { useEffect, useCallback } from "react";
import { URL } from "../../configs";
import api from "../../apis/api";

const LoginButton = ({ token, setToken }) => {
  const logout = async () => {
    await api.get("/auth/logout");
    setToken(null);
  }

  const validateToken = useCallback(async () => {
      try {
        const res = await api.get("/auth/test");
        const isAuthSuccess = res.status >= 200 || res.status <= 299;
        if(isAuthSuccess)
          setToken(res.data);
        else
          setToken(null);
      }
      catch {
        setToken(null);
      }

    }, [setToken]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  if (!token)
    return (
      <a href={`${URL}/api/auth/google`} className="login-btn">
        Log in
      </a>
    );
  return (
    <p onClick={logout} className="login-btn">
      Log out
    </p>
  );
};
export default LoginButton;
