import React, { useState, useContext } from "react";
import "./TweetBox.css";
import { Button, Avatar } from "@material-ui/core";
import { UserContext } from "../UserContext";
import axios from "axios";
function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const userData = useContext(UserContext);
  console.log(userData);
  const tweet = async () => {
    try {
      const res = await axios.post("/tweet", {
        text: tweetMessage,
        image: tweetImage,
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src={userData.avatar} />
          <input
            type="text"
            placeholder="What're u doing"
            value={tweetMessage}
            onChange={(event) => {
              setTweetMessage(event.target.value);
              console.log(tweetMessage);
            }}
          />
          <input
            type="text"
            placeholder="place ur img url here"
            value={tweetImage}
            onChange={(e) => {
              setTweetImage(e.target.value);
            }}
          />
        </div>
        <Button
          className="tweetBox__tweetButton"
          onClick={(e) => {
            tweet(e);
          }}
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
