import React, { useState } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Button } from "@material-ui/core";
import "./SignupNLogin.css";
import axios from "axios";
axios.defaults.baseURL =
  "https://asia-east2-twitter-clone-53ba9.cloudfunctions.net/api";
function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const signupSubmit = async () => {
    try {
      const res = await axios.post("/signup", {
        email,
        password,
        confirmPassword,
        userName: username,
        displayName: name,
        avatar: "",
      });
      console.log(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div className="signup">
      <TwitterIcon className="signup__twitterIcon twitterIcon"></TwitterIcon>
      <form className="signup__form">
        <h2 className="signupForm__header">Create your account</h2>

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

        <div className="signupFormInput__container">
          <span className="signupFormInput__description">Name</span>
          <input
            type="text"
            className="signupForm__input name-input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="signupFormInput__container">
          <span className="signupFormInput__description">Username</span>
          <input
            type="text"
            className="signupForm__input username-input"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

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

        <div className="signupFormInput__container">
          <span className="signupFormInput__description">
            Password confirmation
          </span>
          <input
            type="password"
            className="signupForm__input password-input"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <Button
          className="signup__button submit-button"
          color="primary"
          variant="contained"
          onClick={() => {
            signupSubmit();
          }}
        >
          Signup
        </Button>
      </form>
    </div>
  );
}
export default Signup;
