import React from "react";

export default function Modal({ modalComponent, setModalComponent }) {
  if (!modalComponent) return null;

  const closeModal = () => setModalComponent(null);
  return (
    <div
      style={{
        position: "fixed",
        zIndex: "999",
        backgroundColor: "rgba(0,0,0,0.8)",
        color: "white",
        minHeight: "100%",
        minWidth: "100%",
      }}
      onClick={closeModal}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{
            color: "red",
          }}
          onClick={closeModal}
        >
          X
        </button>
      </div>

      {modalComponent}
    </div>
  );
}
