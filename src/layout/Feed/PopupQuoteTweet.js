import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
import { UserContext } from "../UserContext";
import BarLoader from "react-spinners/BarLoader";
import "./PopupQuoteTweet.css";
export const PostWithoutExtension = ({
  displayName,
  verified,
  userName,
  sinceThen,
  text,
  image,
  avatar,
}) => {
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src={avatar}></Avatar>
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
      </div>
    </div>
  );
};
function PopupQuoteTweet({
  displayName,
  userName,
  verified,
  text,
  tweetOwnerAvatar,
  postId,
  image,
  since,
  increaseRetweetCount,
  setQuoteTweetIsClose,
}) {
  const { avatar } = useContext(UserContext);
  const [isRetweeting, setIsRetweeting] = useState(false);
  const [retweetContent, setRetweetContent] = useState("");
  const retweetWithContext = async () => {
    try {
      setIsRetweeting(true);
      const res = await axios.post(`/post/${postId}/retweet`, {
        content: retweetContent,
      });
      if (res.data) {
        increaseRetweetCount();
        setIsRetweeting(false);
        setQuoteTweetIsClose(true);
      }
    } catch (err) {
      console.error(err);
      setIsRetweeting(false);
    }
  };
  return (
    <div className={`PopupQuoteTweetContainer`}>
      <div className="closeBar popupCloseButton__container">
        <span
          className="closeButton closeBar__icon popup__closeButton"
          onClick={() => {
            setQuoteTweetIsClose(true);
          }}
        >
          <CloseIcon></CloseIcon>
        </span>
      </div>
      {isRetweeting && <BarLoader width="100%" color="#3f51b5"></BarLoader>}
      <div className="quoteTweetContainer">
        <div className="quoteTweetAvatar__container">
          <Avatar src={avatar}></Avatar>
        </div>
        <div className="quoteTweetPost__container">
          <div className="stupidContainer">
            <input
              placeholder="Add a comment"
              value={retweetContent}
              onChange={(e) => setRetweetContent(e.target.value)}
            ></input>
            <div className="miniPost">
              <div
                className={`miniPost__header ${
                  image === "" && "miniPost__header-noImg"
                } `}
              >
                <div className="miniPostHeader__0">
                  <Avatar
                    src={tweetOwnerAvatar}
                    className="miniPost__avatar"
                  ></Avatar>
                  <div className="displayName">{displayName} </div>
                  <span className="post__headerSpecial">
                    {verified && <VerifiedUserIcon className="post__badge" />}
                    {`@${userName} · ${since}`}
                  </span>
                </div>
                <p>{text}</p>
              </div>
              <div className="miniPost__body">
                <img src={image} alt="" />
              </div>
            </div>
          </div>
          <div className="retweetBar">
            <Button
              color="primary"
              variant="contained"
              onClick={() => retweetWithContext()}
            >
              Retweet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PopupQuoteTweet;
