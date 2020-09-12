import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import { MoreVert, InsertEmoticon } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from 'react-router-dom'
import db from './firebase'
import firebase from 'firebase'
import { useStateValue } from './StateProvider'

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams()
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([])
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
        db.collection("chat rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName
        (snapshot.data().name))

        db.collection("chat rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot((snapshot) => 
            setMessages(snapshot.docs.map((doc) => 
            doc.data()))
        )}
      
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

    db.collection("chat rooms").doc(roomId).collection("messages").add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`http://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>{new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
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
          {messages.map(message => (
              <p className={`chat_message ${message.name === user.displayName && "chat_receiver"}`}>
              <span className="chat_name">{message.name}</span>
              {message.message}
              <span className="chat_timestamp">{new Date (message.timestamp?.toDate()).toUTCString()}</span>
            </p>
          ))}
        
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
