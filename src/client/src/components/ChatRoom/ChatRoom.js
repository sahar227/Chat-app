import React, { useEffect, useState, useCallback } from "react";
import api from "../../apis/api";

export default function ChatRoom({ chat, socket }) {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const getMessages = useCallback(async () => {
    const res = await api.get(`/message/${chat._id}`);
    if (res.status >= 200 && res.status <= 299) {
      setMessages(res.data);
    }
  }, [setMessages, chat]);

  const postMessage = async () => {
    const res = await api.post("/message", {
      content: currentMessage,
      chatroom: chat._id,
    });
    if (res.status >= 200 && res.status <= 299) {
      setCurrentMessage("");
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

  if (!chat) return null;

  const renderMessages = () => {
    return messages.map((message) => (
      <div key={message._id}>
        {message.createdAt}
        <p>{message.content}</p>
      </div>
    ));
  };

  return (
    <div>
      <h1>{chat.roomName}</h1>
      {renderMessages()}
      <input
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        placeholder="your message"
      />
      <button onClick={() => postMessage()}>Submit</button>
    </div>
  );
}
