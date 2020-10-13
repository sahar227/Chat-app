import "./Header.css";
import LoginButton from "./LoginButton";
import React from "react";

export default ({ token, setToken }) => {
  return (
    <div className="header-container">
      <h1 className="logo">CHAT-APP</h1>
      <LoginButton token={token} setToken={setToken} />
    </div>
  );
};
