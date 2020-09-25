import React, { useContext } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { Context } from "./useDarkMode";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { IconButton } from "@material-ui/core";

function App() {
  const [{ user }] = useStateValue();
  const { theme, handleClick } = useContext(Context);

  return (
    <div className={`app-${theme}`}>
      {!user ? (
        <Login />
      ) : (
        <>
          <IconButton
            className="themeToggle"
            style={{ color: theme === "dark" && "#b1b3b5" }}
            onClick={handleClick}
          >
            <Brightness4Icon />
          </IconButton>

          <div className={`app_body-${theme}`}>
            <Router>
              <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId" exact>
                  <Chat />
                </Route>

                <Route path="/">
                  <Chat />
                </Route>
              </Switch>
            </Router>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
