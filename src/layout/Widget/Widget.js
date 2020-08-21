import React from "react";
import "./Widget.css";
import SearchIcon from "@material-ui/icons/Search";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";
function Widget() {
  return (
    <div className="widget">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input type="text" placeholder="Search twitter" />
      </div>
      {/* This is a comment */}
      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>
        <TwitterTweetEmbed tweetId="1296801940991438848"></TwitterTweetEmbed>
        <TwitterTimelineEmbed
          sourceName="profile"
          screenName="B2utynguyen"
          options={{ height: 400 }}
        />
        <TwitterShareButton
          url={"https://www.youtube.com/watch?v=tt2k8PGm-TI"}
          options={{ text: "This song is good!!", via: "bearbb" }}
        />
      </div>
    </div>
  );
}

export default Widget;
