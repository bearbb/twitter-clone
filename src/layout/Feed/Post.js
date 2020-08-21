import React from "react";
import "./Post.css";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Avatar from "@material-ui/core/Avatar";
import ChatBubbleIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
function Post({ displayName, userName, verified, text, image, avatar }) {
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src="https://images-na.ssl-images-amazon.com/images/I/51AG6B5vv7L._AC_SX425_.jpg"></Avatar>
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              BearBB{" "}
              <span>
                <VerifiedUserIcon className="post__badge" />
                @bearbb
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              blanditiis ipsa consectetur rerum unde. Dicta, iure. Repellat
              libero provident mollitia veritatis, deleniti, at quaerat fuga
              nisi animi, a possimus sequi! */}
            </p>
          </div>
        </div>
        <img
          src="https://media.giphy.com/media/l0HlNkEPRnXVeEE2A/giphy.gif"
          alt="Gif"
        />
        <div className="post__footer">
          <ChatBubbleIcon fontSize="small" />
          <RepeatIcon fontSize="small" />
          <FavoriteIcon fontSize="small" />
          <PublishIcon fontSize="small" />
        </div>
      </div>
    </div>
  );
}

export default Post;
