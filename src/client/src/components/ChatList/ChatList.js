import React from "react";
import AddChatButton from "./AddChatButton";
import ChatItem from "./ChatItem";

export default function ChatList({ availableChats, setModalComponent }) {
  return (
    <div style={{ border: "1px solid red" }}>
      {availableChats.map((chat) => (
        <ChatItem key={chat._id} data={chat} />
      ))}
      <AddChatButton setModalComponent={setModalComponent} />
    </div>
  );
}
