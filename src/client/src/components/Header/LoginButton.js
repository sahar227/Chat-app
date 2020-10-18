import React, { useEffect, useCallback } from "react";
import { URL } from "../../configs";
import api from "../../apis/api";

const LoginButton = ({ token, setToken }) => {
  const validateToken = useCallback(async () => {
    const jwtToken = localStorage.get("JWT");
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
    <a
      href="/"
      onClick={() => localStorage.removeItem("JWT")}
      className="login-btn"
    >
      Log out
    </a>
  );
};
export default LoginButton;
