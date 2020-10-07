import React from "react";

export default function AddChatButton() {
  return (
    <button
      onClick={() =>
        console.log("Should open a modal and allow to add particiapnts")
      }
    >
      add chat room
    </button>
  );
}
