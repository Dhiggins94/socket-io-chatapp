import React, { useEffect, useState } from "react";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrenetMessage] = useState("");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        user: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
    }
    // this is so if the message isnt empty to send a message. if it IS, we cannot send a msg.
    // the messageData sends an object to the backend socket server that contains our messsage,the room, the username and the time it was sent. this should be async await so it can wait for the message to be sent before we do something else. the socket.emit("send-message") connects the front to the backend socket server to send the message data object.
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Hey.."
          onChange={(event) => {
            setCurrenetMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
        {/*&#9658; html code symbol for the arrow on the button  */}
      </div>
    </div>
  );
}

export default Chat;

// this is where we're going to send and recieve messages using socket.io
