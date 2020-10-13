import React from "react";
import LoginButton from "../Header/LoginButton";
import "./NotLoggedIn.css";

export default function NotLoggedIn({ token, setToken }) {
  return (
    <div className="not-logged-in-container">
      <p>Please log in with google to use this app</p>
      <LoginButton token={token} setToken={setToken} />
    </div>
  );
}
