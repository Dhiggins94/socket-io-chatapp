import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat.js";
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true)
    }
    // connects to the backend, sends data from join room to the backend to allow room joining
  };

  return (
    <div className="App">
      {/* the show chat boolean is so that if we're in a chat room to show the chat, if not keep it hidden */}
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room Id..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}> Join A room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
      {/* passing socket as a prop for chat.js */}
    </div>
  );
}

export default App;
