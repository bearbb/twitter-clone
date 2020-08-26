import React, { useEffect, useState } from "react";
import "./Feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import db from "../../firebase";
import axios from "axios";
function Feed() {
  const [posts, setPosts] = useState([]);
  const [fetch, setFetch] = useState(false);
  useEffect(() => {
    //TODO: add a fucking header with authentication bearer so it can access to the database
    axios
      .get("/home")
      .then((res) => {
        setPosts(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
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
