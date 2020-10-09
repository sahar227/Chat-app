import React from "react";
import TestView from "../ModalViews/TestView";

export default function AddChatButton({ setModalComponent }) {
  return (
    <button onClick={() => setModalComponent(TestView)}>add chat room</button>
  );
}
