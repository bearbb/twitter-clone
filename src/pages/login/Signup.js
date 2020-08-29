import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import SignupFormInput from "./SingupFormInput";
import { Button } from "@material-ui/core";
import "./Signup.css";
function Signup() {
  return (
    <div className="signup">
      <TwitterIcon className="signup__twitterIcon"></TwitterIcon>
      <form className="signup__form">
        <h2 className="signupForm__header">Create your account</h2>
        <SignupFormInput placeholder="email" />
        <SignupFormInput placeholder="name" />
        <SignupFormInput placeholder="username" />
        <SignupFormInput placeholder="password" />
        <SignupFormInput placeholder="confirmPassword" />
        <Button
          className="signup__button submit-button"
          color="primary"
          variant="contained"
        >
          Signup
        </Button>
      </form>
    </div>
  );
}
export default Signup;
