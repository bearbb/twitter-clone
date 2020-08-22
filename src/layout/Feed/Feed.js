import React, { useEffect, useState } from "react";
import "./Feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import db from "../../firebase";
function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);
  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <TweetBox />
      {posts.map(({ displayName, userName, verified, avatar, text, image }) => (
        /* TODO:add key on every post */
        <Post
          displayName={displayName}
          userName={userName}
          verified={verified}
          avatar={avatar}
          text={text}
          image={image}
        />
      ))}
    </div>
  );
}

export default Feed;
