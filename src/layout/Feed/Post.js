import React, { useState } from "react";
import "./Post.css";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Avatar from "@material-ui/core/Avatar";
import ChatBubbleIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import Popup from "reactjs-popup";
import axios from "axios";
import PopupReply from "./PopupReply";
import PopupQuoteTweet from "./PopupQuoteTweet";
function Post({
  displayName,
  userName,
  verified,
  text,
  image,
  avatar,
  sinceThen,
  postId,
  likeCount,
  tweetCount,
  retweetCount,
}) {
  const [replyIsClose, setReplyIsClose] = useState(true);
  const [quoteTweetIsClose, setQuoteTweetIsClose] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const [tweetCountState, setTweetCountState] = useState(tweetCount);
  const [retweetCountState, setRetweetCountState] = useState(retweetCount);
  const likeTweet = async () => {
    try {
      const res = await axios.post(`/post/${postId}/like`);
      console.log(res.data);
      setLikeCountState(res.data.likeCount);
    } catch (err) {
      console.error(err);
    }
  };
  const retweet = async () => {
    try {
      const res = await axios.post(`/post/${postId}/retweet`, { content: "" });
      res.data && setRetweetCountState(retweetCountState + 1);
    } catch (err) {
      console.error(err);
    }
  };
  const increaseRetweetCount = () => {
    setRetweetCountState(retweetCountState + 1);
  };
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src={`${avatar}`}></Avatar>
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {displayName}{" "}
              <span className="post__headerSpecial">
                {verified && <VerifiedUserIcon className="post__badge" />}
                {`@${userName} · ${sinceThen}`}
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>{text}</p>
          </div>
        </div>
        <img className="post__image" src={`${image}`} alt="" />
        <div className="post__footer">
          <div className="tweetButton__container reply__container">
            <span
              className="tweet__button reply-button"
              onClick={() => setReplyIsClose(false)}
            >
              <ChatBubbleIcon fontSize="small" />
            </span>
            {tweetCountState}
          </div>
          <Popup
            open={!replyIsClose}
            closeOnDocumentClick
            nested
            modal
            onClose={() => setReplyIsClose(true)}
            position="center center"
          >
            <PopupReply
              displayName={displayName}
              sinceThen={sinceThen}
              text={text}
              tweetOwnerAvatar={avatar}
              userName={userName}
              setClose={setReplyIsClose}
              postId={postId}
              setTweetCountState={setTweetCountState}
              tweetCount={tweetCount}
            ></PopupReply>
          </Popup>
          <div className="retweet__container tweetButton__container">
            <span
              className="tweet__button retweet-button"
              onClick={() => {
                setQuoteTweetIsClose(false);
              }}
            >
              <RepeatIcon fontSize="small" />
            </span>
            {retweetCountState}
          </div>
          <Popup
            open={!quoteTweetIsClose}
            closeOnDocumentClick
            nested
            modal
            onClose={() => setQuoteTweetIsClose(true)}
            position="center center"
          >
            <PopupQuoteTweet
              tweetOwnerAvatar={avatar}
              displayName={displayName}
              verified={verified}
              userName={userName}
              since={sinceThen}
              text={text}
              image={image}
              postId={postId}
              increaseRetweetCount={increaseRetweetCount}
              setQuoteTweetIsClose={setQuoteTweetIsClose}
            ></PopupQuoteTweet>
          </Popup>
          <div className="like__container tweetButton__container">
            <span
              className="tweet__button like-button"
              onClick={() => {
                likeTweet();
              }}
            >
              <FavoriteIcon fontSize="small" />
            </span>
            {likeCountState}
          </div>
          <span className="tweet__button share-button" onClick={() => {}}>
            <PublishIcon fontSize="small" />{" "}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Post;
