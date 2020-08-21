import React from "react";
import "./Feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
function Feed() {
  return (
    <div className="feed">
      {/* Header

    TweetBox

    Box
    Box
    Box
    Box
    Box
    Box */}
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <TweetBox />
      <Post />
    </div>
  );
}

export default Feed;
