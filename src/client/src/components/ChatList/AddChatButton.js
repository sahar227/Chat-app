import React from "react";

export default function AddChatButton({ setModalComponent }) {
  return (
    <button onClick={() => setModalComponent("CreateRoom")}>
      add chat room
    </button>
  );
}
