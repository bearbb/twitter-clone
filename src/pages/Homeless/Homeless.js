import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import Button from "@material-ui/core/Button";
import "./Homeless.css";
function Homeless() {
  return (
    <div className="homeless__container">
      <TwitterIcon className="twitterIcon" />
      <h2 className="homeless__header">
        See what's happening in the word right now
      </h2>
      <span className="homeless__description">Join Twitter today.</span>
      <Button className="homeless__button signupButton">Sign Up</Button>
      <Button className="homeless__button loginButton">Login</Button>
    </div>
  );
}

export default Homeless;
