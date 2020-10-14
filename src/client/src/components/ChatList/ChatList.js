import React from "react";
import AddChatButton from "./AddChatButton";
import ChatItem from "./ChatItem";
import "./ChatList.css";

export default function ChatList({
  availableChats,
  setModalComponent,
  setSelectedChat,
  selectedChat,
}) {
  return (
    <div className="chat-list-container">
      <div className="chat-list-bg">
        <h2 className="chat-list-title">Rooms:</h2>
        {availableChats.map((chat) => (
          <ChatItem
            key={chat._id}
            data={chat}
            selectedChat={selectedChat}
            selectChat={() => setSelectedChat(chat)}
          />
        ))}
        <AddChatButton setModalComponent={setModalComponent} />
      </div>
    </div>
  );
}
