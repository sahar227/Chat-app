import React from "react";
import "./Modal.css";

export default function Modal({ modalComponent, setModalComponent, children }) {
  if (modalComponent === "") return null;

  const closeModal = () => setModalComponent("");
  return (
    <div className="modal-bg" onClick={closeModal}>
      <div className="modal-container">
        <div onClick={(e) => e.stopPropagation()} className="modal">
          <div className="modal-header">
            <p style={{ color: "white" }}>Create room</p>
            <button className="modal-close-button" onClick={closeModal}>
              X
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
