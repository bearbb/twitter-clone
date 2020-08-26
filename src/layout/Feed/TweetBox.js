import React, { useState, useEffect } from "react";
import "./TweetBox.css";
import { Button, Avatar } from "@material-ui/core";
import db from "../../firebase";
function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const tweet = (e) => {
    e.preventDefault();
    db.collection("posts").add({
      displayName: "Hooper in the hood",
      userName: "hooper",
      verified: false,
      avatar:
        "https://ih1.redbubble.net/image.973946953.0625/flat,750x1000,075,f.jpg",
      text: tweetMessage,
      image: tweetImage,
      createAt: `${new Date().toISOString()}`,
    });
    setTweetImage("");
    setTweetMessage("");
  };
  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="https://images-na.ssl-images-amazon.com/images/I/51AG6B5vv7L._AC_SX425_.jpg"></Avatar>
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
