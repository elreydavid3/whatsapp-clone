import React, { useState, useEffect, useContext } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import { Context } from "./useDarkMode";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const { theme } = useContext(Context);

  useEffect(() => {
    const unsubscribe = db.collection("chat rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    //clean up function to always detach real time listener
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={`sidebar-${theme}`}>
      <div className={`sidebar_header-${theme}`}>
        <Avatar src={user?.photoURL} />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon style={{ color: theme === "dark" && "#b1b3b5" }} />
          </IconButton>
          <IconButton>
            <ChatIcon style={{ color: theme === "dark" && "#b1b3b5" }} />
          </IconButton>
          <IconButton>
            <MoreVertIcon style={{ color: theme === "dark" && "#b1b3b5" }} />
          </IconButton>
        </div>
      </div>
      <div className={`sidebar_search-${theme}`}>
        <div className={`sidebar_searchContainer-${theme}`}>
          <SearchOutlined />
          <input
            placeholder="Search or start new chat"
            type="text"
            style={{ color: theme === "dark" && "#b1b3b5" }}
          />
        </div>
      </div>
      <div className={`sidebar_chats-${theme}`}>
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
