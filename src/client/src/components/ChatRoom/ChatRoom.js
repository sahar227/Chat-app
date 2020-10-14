import React, { useEffect, useState, useCallback } from "react";
import api from "../../apis/api";
import NoRoomSelected from "../NoRoomSelected/NoRoomSelected";
import "./ChatRoom.css";

export default function ChatRoom({ chat, socket }) {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [error, setError] = useState("");
  const getMessages = useCallback(async () => {
    const res = await api.get(`/message/${chat._id}`);
    if (res.status >= 200 && res.status <= 299) {
      setMessages(res.data);
    }
  }, [setMessages, chat]);

  const postMessage = async () => {
    if (currentMessage === "") return;
    const res = await api.post("/message", {
      content: currentMessage,
      chatroom: chat._id,
    });
    if (res.status >= 200 && res.status <= 299) {
      setCurrentMessage("");
    }
  };

  const setMessage = (e) => {
    if (e.target.value.length > 255) {
      setError("Max message length reached");
    } else {
      setCurrentMessage(e.target.value);
      setError("");
    }
  };

  useEffect(() => {
    if (chat == null) return;
    getMessages();
  }, [chat, getMessages]);

  useEffect(() => {
    if (!socket) return;
    socket.on("new message", (m) => {
      if (m.chatRoom === chat._id) setMessages((prev) => [...prev, m]);
    });
    return () => socket.off("new message");
  }, [socket, chat]);

  const renderMessages = () => {
    return messages.map((message) => (
      <div key={message._id}>
        {/* {message.createdAt} */}
        <p>
          {message.author.name.first} {message.author.name.last}:{" "}
          {message.content}
        </p>
      </div>
    ));
  };

  const renderRoom = () => {
    if (!chat) return <NoRoomSelected />;
    return (
      <>
        <h1 className={"room-name"}>{chat.roomName}</h1>
        <div className="messages-container">{renderMessages()}</div>

        <div className="message-input">
          <input
            value={currentMessage}
            onKeyDown={(e) => e.key === "Enter" && postMessage()}
            onChange={setMessage}
            placeholder="your message"
            style={{ flexGrow: "1", marginRight: "3px" }}
          />
          <button onClick={() => postMessage()}>Submit</button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </>
    );
  };

  return <div className="chat-room-container">{renderRoom()}</div>;
}
