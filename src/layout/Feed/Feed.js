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
      setPosts(res.data);
      // console.log(res.data);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchAllData = async () => {
    //fetch post first =>
    let postsData, likesData;
    const postRes = await axios.get("/posts/");
    postsData = postRes.data;
    likesData = postsData.map(async (post) => {
      const likeRes = await axios.get(`/getLikeData/${post.postId}/bearbb`);
      let isLiked = likeRes.data.isLiked;
      return {
        ...post,
        isLiked,
      };
    });
    let payload = await Promise.all(likesData);
    console.log(payload);
    setPosts(payload);
  };
  useEffect(() => {
    // fetchPostData();
    // console.log(data);
    fetchAllData();
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
          postId,
          likeCount,
          tweetCount,
          retweetCount,
          isLiked,
        }) => (
          <Post
            key={postId}
            isLiked={isLiked}
            displayName={displayName}
            userName={userName}
            verified={verified}
            avatar={avatar}
            text={text}
            image={image}
            sinceThen={sinceThen(createAt)}
            postId={postId}
            likeCount={likeCount}
            tweetCount={tweetCount}
            retweetCount={retweetCount}
          />
        )
      )}
    </div>
  );
}

export default Feed;
