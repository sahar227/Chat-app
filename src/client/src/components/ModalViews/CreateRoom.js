import React, { useState } from "react";
import api from "../../apis/api";
import "./CreateRoom.css";

export default function CreateRoom({ createNewRoom }) {
  const [roomName, setRoomName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [participantsToAdd, setParticipantsToAdd] = useState([]);
  const [error, setError] = useState("");

  const addParticipant = async () => {
    if (participantsToAdd.map((p) => p.email).indexOf(emailInput) !== -1) {
      setError("User is already in participants list");
      return;
    }
    try {
      const res = await api.post("/user", { email: emailInput });
      const user = res.data;
      setError("");
      setEmailInput("");
      setParticipantsToAdd((prev) => [...prev, user]);
    } catch ({ response }) {
      setError(response.data);
    }
  };

  const handleRoomNameInput = (e) => {
    if (e.target.value.length > 20) {
      setError("Max room name length reached");
    } else {
      setRoomName(e.target.value);
      setError("");
    }
  };
  return (
    <div className="form-container">
      <div className="input-row">
        <p className="label">Room name:</p>
        <input
          className="input"
          type="text"
          placeholder="New room name"
          value={roomName}
          onChange={handleRoomNameInput}
        />
      </div>
      <div className="input-row">
        <p className="label">Email:</p>
        <div style={{ display: "flex" }}>
          <input
            className="input"
            type="email"
            placeholder="Enter friend's email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <button className="button" onClick={addParticipant}>
            Add!
          </button>
        </div>
      </div>
      {participantsToAdd.map((user) => (
        <p key={user._id}>
          {user.name.first} {user.name.last}
        </p>
      ))}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        className="button"
        onClick={() =>
          createNewRoom(
            roomName,
            participantsToAdd.map((user) => user._id)
          )
        }
      >
        Create room!
      </button>
    </div>
  );
}
