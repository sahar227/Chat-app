import React, { useState } from "react";
import api from "../../apis/api";
import "./CreateRoom.css";

export default function CreateRoom({ createNewRoom }) {
  const [roomName, setRoomName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [participantsToAdd, setParticipantsToAdd] = useState([]);

  const addParticipant = async () => {
    const res = await api.post("/user", { email: emailInput });
    if (res.status < 200 || res.status > 299) return;
    const user = res.data;
    setParticipantsToAdd((prev) => [...prev, user]);
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
          onChange={(e) => setRoomName(e.target.value)}
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
