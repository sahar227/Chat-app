import React from "react";

export default function AddChatButton({ setModalComponent }) {
  return (
    <button
      className="button"
      style={{ marginTop: "1rem" }}
      onClick={() => setModalComponent("CreateRoom")}
    >
      New Room
    </button>
  );
}
