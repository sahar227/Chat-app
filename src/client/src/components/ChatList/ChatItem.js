import React from "react";

export default function ChatItem({ data, selectChat }) {
  return (
    <div onClick={selectChat} style={{ cursor: "pointer" }}>
      <h3>{data.roomName}</h3>
      {data.lastMessage && (
        <p>
          {data.lastMessage.author}: {data.lastMessage.content}
        </p>
      )}
    </div>
  );
}
