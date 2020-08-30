import React, { useState, useEffect } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Button } from "@material-ui/core";
import axios from "axios";
import "./SignupNLogin.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginSubmit = async () => {
    const res = await axios.post("/login", {
      email,
      password,
    });
    console.log(res.data.token);
  };
  return (
    <div>
      <div className="login">
        <TwitterIcon className="login__twitterIcon twitterIcon"></TwitterIcon>
        <form className="login__form">
          <h2 className="loginForm__header">Login to your account</h2>
          {/* email input */}
          <div className="signupFormInput__container">
            <span className="signupFormInput__description">Email</span>
            <input
              type="email"
              className="signupForm__input email-input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          {/* password input */}
          <div className="signupFormInput__container">
            <span className="signupFormInput__description">Password</span>
            <input
              type="password"
              className="signupForm__input password-input"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <Button
            onClick={() => {
              loginSubmit();
            }}
            className="login__button"
            color="primary"
            variant="contained"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
