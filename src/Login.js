import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
        <img
          src="https://whatsappbrand.com/wp-content/themes/whatsapp-brc/images/WhatsApp_Logo_8.png "
          alt=""
          style={{height: "600px", width: "600px"}}
        />
        <Button className="button" onClick={signIn}>Sign in With Google</Button>

    </div>
  );
}

export default Login;
