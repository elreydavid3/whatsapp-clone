import React, { useState, useEffect, useContext } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import "./SidebarChat.css";
import db from "./firebase";
import { Link } from "react-router-dom";
import { Context } from "./useDarkMode";
import CloseIcon from "@material-ui/icons/Close";

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  const { theme } = useContext(Context);

  useEffect(() => {
    if (id) {
      db.collection("chat rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat room");

    if (roomName) {
      //pull data from firestore
      db.collection("chat rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className={`sidebarChat-${theme}`}>
        <Avatar src={`http://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className={`sidebarChat_info-${theme}`}>
          <span className="delete">
            <IconButton>
              <CloseIcon style={{ color: theme === "dark" && "#b1b3b5" }} />
            </IconButton>
          </span>
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className={`sidebarChat-${theme}`}>
      <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat;
