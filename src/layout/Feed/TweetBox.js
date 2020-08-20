import React from "react";
import "./TweetBox.css";
import { Button, Avatar } from "@material-ui/core";
function TweetBox() {
  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="https://images-na.ssl-images-amazon.com/images/I/51AG6B5vv7L._AC_SX425_.jpg"></Avatar>
          <input type="text" placeholder="What're u doing>" />
          {/* <input type="text" placeholder="place ur img url here" /> */}
        </div>
        <Button className="tweetBox__tweetButton">Tweet</Button>
      </form>
    </div>
  );
}

export default TweetBox;
