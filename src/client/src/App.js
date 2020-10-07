import React, { useEffect, useState, useMemo } from "react";
import Header from "./components/Header/Header";
import socketIOClient from "socket.io-client";
import { URL } from "./configs";
import api from "./apis/api";
import ChatList from "./components/ChatList/ChatList";
import ChatRoom from "./components/ChatRoom/ChatRoom";

export default function App() {
  const [token, setToken] = useState(null);
  const [chats, setChats] = useState([]);

  // TODO: pass this method to a modal
  const createNewRoom = async (chat) => {
    const res = await api.post("/chatroom", {
      roomName: "room from front end",
      participants: [],
    });
    if (res.status === 200) setChats((prev) => [...prev, res.data]);
  };

  const getChats = useMemo(
    () => () => {
      api
        .get("/chatroom")
        .then((res) => setChats(res.data))
        .catch(console.log);
    },
    []
  );
  useEffect(() => {
    if (!token) return;
    const socket = socketIOClient(URL);
    socket.on("requestAuth", () => {
      socket.emit("authenticate", token);
    });
    socket.on("authFailed", () => {
      console.log("auth failed");
    });
    socket.on("authSuccess", () => {
      console.log("auth success");
    });

    // clean up when done
    return () => socket.disconnect();
  }, [token]);

  useEffect(() => {
    if (!token) return;
    getChats();
  }, [token, getChats]);
  return (
    <div>
      <Header token={token} setToken={setToken} />
      <div style={{ display: "flex" }}>
        <ChatList availableChats={chats} />
        <ChatRoom />
      </div>
      <button onClick={createNewRoom}>Create room</button>
    </div>
  );
}
