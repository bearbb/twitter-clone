import React, { useState, useEffect } from "react";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
function PopupReply({
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
        <span className="popup__closeButton " onClick={() => setClose(true)}>
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
export default PopupReply;
