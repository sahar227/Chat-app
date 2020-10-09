import React from "react";
import CreateRoom from "../ModalViews/CreateRoom";

export default function AddChatButton({ setModalComponent }) {
  return (
    <button onClick={() => setModalComponent(CreateRoom)}>add chat room</button>
  );
}
