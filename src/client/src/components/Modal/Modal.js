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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "white",
            color: "black",
            height: "50%",
            width: "50%",
          }}
        >
          <div
            style={{
              backgroundColor: "gray",
              padding: "0.25rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ color: "white" }}>Create room</p>
            <button
              style={{
                color: "red",
                width: "1.5rem",
                height: "1.5rem",
              }}
              onClick={closeModal}
            >
              X
            </button>
          </div>

          {modalComponent}
        </div>
      </div>
    </div>
  );
}
