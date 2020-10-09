import React, { useEffect, useState, useMemo } from "react";
import Header from "./components/Header/Header";
import socketIOClient from "socket.io-client";
import { URL } from "./configs";
import api from "./apis/api";
import ChatList from "./components/ChatList/ChatList";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import Modal from "./components/Modal/Modal";

export default function App() {
  const [token, setToken] = useState(null);
  const [chats, setChats] = useState([]);
  const [modalComponent, setModalComponent] = useState(null);

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
    <>
      <Modal
        modalComponent={modalComponent}
        setModalComponent={setModalComponent}
      />
      <div>
        <Header token={token} setToken={setToken} />
        <div style={{ display: "flex" }}>
          <ChatList
            availableChats={chats}
            setModalComponent={setModalComponent}
          />
          <ChatRoom />
        </div>
        <button onClick={createNewRoom}>Create room</button>
      </div>
    </>
  );
}
