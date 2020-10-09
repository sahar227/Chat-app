import React, { useEffect, useCallback } from "react";
import { URL } from "../../configs";
import Cookies from "js-cookie";
import api from "../../apis/api";

const LoginButton = ({ token, setToken }) => {
  const validateToken = useCallback(async () => {
    const jwtToken = Cookies.get("jwt");
    if (jwtToken) {
      const res = await api.get("/auth/test");
      if (res.status >= 200 || res.status <= 299) setToken(jwtToken);
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
    <a href="/" onClick={() => Cookies.remove("jwt")} className="login-btn">
      Log out
    </a>
  );
};
export default LoginButton;
