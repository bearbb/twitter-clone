import React, { useState, useEffect } from "react";
import "./Post.css";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Avatar from "@material-ui/core/Avatar";
import ChatBubbleIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import CloseIcon from "@material-ui/icons/Close";
import Popup from "reactjs-popup";
import { Button } from "@material-ui/core";
import axios from "axios";
function PopupPost({
  displayName,
  userName,
  verified,
  text,
  tweetOwnerAvatar,
  userAvatar,
  sinceThen,
  setClose,
  postId,
  tweetCount,
  setTweetCountState,
}) {
  const [reply, setReply] = useState("");
  const [replyButtonIsDisabled, setReplyButtonIsDisabled] = useState(true);
  const [replyIsSuccess, setReplyIsSuccess] = useState(false);
  useEffect(() => {
    if (reply !== "") {
      setReplyButtonIsDisabled(false);
    } else {
      setReplyButtonIsDisabled(true);
    }
  }, [reply]);
  //TODO: add reply submit => send reply through api and update reply count??
  //DATA to send {
  //   content: "",
  //   image:""
  // }
  const submitReply = async () => {
    try {
      const res = await axios.post(`/post/${postId}/reply`, {
        content: reply,
        image: "",
      });
      if (res.data) {
        setReplyIsSuccess(true);
        setTweetCountState(tweetCount + 1);
        setClose(true);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="popup__container">
      <div className="popupCloseButton__container">
        <span
          className="popup__closeButton tweet__button"
          onClick={() => setClose(true)}
        >
          <CloseIcon></CloseIcon>
        </span>
      </div>
      <div className="post popup__post">
        <div className="post__avatar">
          <Avatar src={`${tweetOwnerAvatar}`}></Avatar>
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
        </div>
      </div>
      <div className="post__reply">
        <div className="postReply__avatar">
          <Avatar src={userAvatar}></Avatar>
        </div>
        <textarea
          type="text"
          className="reply__input"
          placeholder="Tweet your reply"
          rows={6}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
      </div>
      <div className="replyButton__container">
        <Button
          color="primary"
          variant="contained"
          disabled={replyButtonIsDisabled}
          className="replyButton"
          onClick={() => submitReply()}
        >
          Reply
        </Button>
      </div>
    </div>
  );
}
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
  const [close, setClose] = useState(true);
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
              onClick={() => setClose(false)}
            >
              <ChatBubbleIcon fontSize="small" />
            </span>
            {tweetCountState}
          </div>
          <Popup
            open={!close}
            closeOnDocumentClick
            nested
            modal
            onClose={() => setClose(true)}
            position="center center"
          >
            <PopupPost
              displayName={displayName}
              sinceThen={sinceThen}
              text={text}
              tweetOwnerAvatar={avatar}
              userName={userName}
              setClose={setClose}
              postId={postId}
              setTweetCountState={setTweetCountState}
              tweetCount={tweetCount}
            ></PopupPost>
          </Popup>
          <div className="retweet__container tweetButton__container">
            <span className="tweet__button retweet-button" onClick={() => {}}>
              <RepeatIcon fontSize="small" />
            </span>
            {retweetCountState}
          </div>
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
