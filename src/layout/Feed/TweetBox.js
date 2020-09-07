import React, { useState, useContext, useEffect } from "react";
import "./TweetBox.css";
import { Button, Avatar } from "@material-ui/core";
import { UserContext } from "../UserContext";
import { ReFetchingContext } from "./ReFetchingContext";
import axios from "axios";
function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const userData = useContext(UserContext);
  const { reFetching, setReFetching } = useContext(ReFetchingContext);
  const [isDisable, setIsDisable] = useState(true);
  // console.log(userData);
  const tweet = async () => {
    try {
      const res = await axios.post("/tweet", {
        text: tweetMessage,
        image: tweetImage,
      });
      if (res.data.tweet) {
        setTweetImage("");
        setTweetMessage("");
        setReFetching(true);
      }
    } catch (err) {
      console.error(err);
    }
  };
  //CHECK IF TWEET MESSAGE IS EMPTY OR NOT
  useEffect(() => {
    if (tweetMessage !== "") {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [tweetMessage]);
  return (
    <div className="tweetBox">
      <div className="tweetBox__input">
        <div className="tweetBox__1stContainer">
          <Avatar src={userData.avatar} />
          <input
            className="tweetBox__input-real"
            type="text"
            placeholder="What're u doing"
            value={tweetMessage}
            onChange={(event) => {
              setTweetMessage(event.target.value);
            }}
          />
        </div>
        <div className="tweetBox__2ndContainer">
          <input
            className="tweetBox__input-real"
            type="text"
            placeholder="place ur img url here"
            value={tweetImage}
            onChange={(e) => {
              setTweetImage(e.target.value);
            }}
          />
          <Button
            className={`tweet-button`}
            disabled={isDisable}
            color="primary"
            variant="contained"
            className="tweetBox__tweetButton"
            onClick={(e) => {
              tweet(e);
            }}
          >
            Tweet
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TweetBox;
