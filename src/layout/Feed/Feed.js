import React, { useEffect, useState, useContext } from "react";
import "./Feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import db from "../../firebase";
import axios from "axios";
import { ReFetchingContext } from "./ReFetchingContext";
import { sinceThen } from "./sinceThen";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [reFetching, setReFetching] = useState(false);
  const fetchPostData = async () => {
    try {
      const res = await axios.get("/posts");
      console.log(res.data);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchPostData();
  }, []);
  //RE FETCHING DATA WHEN TWEET BOX TWEET A NEW TWEET
  useEffect(() => {
    if (reFetching === true) {
      fetchPostData();
    }
    return () => {
      setReFetching(false);
    };
  }, [reFetching]);
  return (
    <div className="feed">
      {" "}
      <div className="feed__header">
        <h2>Home</h2>{" "}
      </div>
      <ReFetchingContext.Provider value={{ reFetching, setReFetching }}>
        <TweetBox />
      </ReFetchingContext.Provider>
      {posts.map(
        ({
          displayName,
          userName,
          verified,
          avatar,
          text,
          image,
          createAt,
        }) => (
          <Post
            displayName={displayName}
            userName={userName}
            verified={verified}
            avatar={avatar}
            text={text}
            image={image}
            sinceThen={sinceThen(createAt)}
          />
        )
      )}
    </div>
  );
}

export default Feed;
