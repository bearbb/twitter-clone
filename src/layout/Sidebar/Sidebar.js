import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MessageIcon from "@material-ui/icons/MailOutline"; //MessageIcon
import BookmarkIcon from "@material-ui/icons/BookmarkBorder";
import ListIcon from "@material-ui/icons/FormatListBulleted";
import ProfileIcon from "@material-ui/icons/PersonOutline";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";

import SidebarOption from "./SidebarOption";
import "./Sidebar.css";
function Sidebar() {
  return (
    <div className="sidebar">
      {/* Twitter icon */}
      <TwitterIcon className="sidebar__twitterIcon" />

      <SidebarOption text="Home" Icon={HomeIcon} active />
      <SidebarOption text="Explore" Icon={ExploreIcon} />
      <SidebarOption text="Notifications" Icon={NotificationsNoneIcon} />
      <SidebarOption text="Messages" Icon={MessageIcon} />
      <SidebarOption text="Bookmarks" Icon={BookmarkIcon} />
      <SidebarOption text="Lists" Icon={ListIcon} />
      <SidebarOption text="Profile" Icon={ProfileIcon} />
      <SidebarOption text="More" Icon={MoreIcon} />

      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>
    </div>
  );
}

export default Sidebar;
