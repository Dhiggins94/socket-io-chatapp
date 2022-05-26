import React, { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  // messagelist represents the state of messages we want to display in the chat, so we're going to make it an array
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
      setMessageList((list) => [...list, messageData]);
      // we emit the message so we can see our own messages
    }
    // this is so if the message isnt empty to send a message. if it IS, we cannot send a msg.
    // the messageData sends an object to the backend socket server that contains our messsage,the room, the username and the time it was sent. this should be async await so it can wait for the message to be sent before we do something else. the socket.emit("send-message") connects the front to the backend socket server to send the message data object.
  };
  
  useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
  setMessageList((list) => [...list, data]);
    });
    // we're grabbing the current(previous) state of the message(list) then we add the new event/message that comes in (data)
    // if its just socket.on(recieve_message) it will start doing sending double text. socket.off allows the specific listeiner from the listner array (recieve message) to be remove. then flicks on receive message to turn it back on
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>

      <div className="chat-body">
      <ScrollToBottom className="message-container">
        {messageList.map((messageContent,id) => {
          return (   
            <div
            key={id}
              className="message"
              id={username === messageContent.user ? "you" : "other"}
            >
              {/* this shows that if its the user(you) that sends the message depending on the id, it will display messages on the left, if not it will be on the right */}
              <div>
                
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.user}</p>
                </div>
              </div>
            </div>
          );
          
          // this maps and displays the message to the chat window thats being sent from the messageData object. later the setMessageList then grabs that data and displays that to the backend under socket.io("receive message")
        })}
           </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        {/* // this allows the enter key and event.key are the same, allow the sendmessage function to work. */}

        <button onClick={sendMessage}>&#9658;</button>
        {/*&#9658; html code symbol for the arrow on the button  */}
      </div>
    </div>
  );
}

export default Chat;

// this is where we're going to send and recieve messages using socket.io
