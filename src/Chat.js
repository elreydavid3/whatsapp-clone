import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import { MoreVert, InsertEmoticon } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from 'react-router-dom'
import db from './firebase'

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams()
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    if (roomId) {
        db.collection("chat rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName
        (snapshot.data().name))
    }
      
  }, [roomId]);
  //to make room avatar change whenever user clicks a diff room
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You type >>>> ", input);

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`http://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        <p className={`chat_message ${true && "chat_receiver"}`}>
          <span className="chat_name">David</span>
          yoo
          <span className="chat_timestamp">3:00pm</span>
        </p>
      </div>

      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={handleChange}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
