import React from "react";
import "./ChatItem.css";

export default function ChatItem({ data, selectChat, selectedChat }) {
  const activeStyle = () => {
    if (!selectedChat) return "";
    return selectedChat._id === data._id ? "chat-item-active" : "";
  };
  return (
    <div className={`chat-item ${activeStyle()}`} onClick={selectChat}>
      <h3>{data.roomName}</h3>
      {data.lastMessage && (
        <p>
          {data.lastMessage.author}: {data.lastMessage.content}
        </p>
      )}
    </div>
  );
}
