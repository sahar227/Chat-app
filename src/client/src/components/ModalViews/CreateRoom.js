import React, { useState } from "react";
import api from "../../apis/api";

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
    <div>
      <div>
        Room name:
        <input
          type="text"
          placeholder="New room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </div>
      <div>
        Email:
        <input
          type="email"
          placeholder="Enter friend's email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <button onClick={addParticipant}>Add!</button>
      </div>
      {participantsToAdd.map((user) => (
        <p>
          {user.name.first} {user.name.last}
        </p>
      ))}
      <button
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
