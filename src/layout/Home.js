import React, { useState, useEffect } from "react";
import Feed from "./Feed/Feed";
import Sidebar from "./Sidebar/Sidebar";
import { UserContext } from "./UserContext";
import "./Home.css";
import axios from "axios";
function Home() {
  const [userData, setUserData] = useState({});
  const [isFetchingUserData, setIsFetchingUserData] = useState(false);
  useEffect(() => {
    //Fetch user data on load
    async function fetchData() {
      try {
        setIsFetchingUserData(true);
        const res = await axios.get("/user", { withCredentials: true });
        console.log(res.data);
        setIsFetchingUserData(false);
        setUserData(res.data);
      } catch (err) {
        setIsFetchingUserData(false);
        console.error(err);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  return (
    //Component display Sidebar, Feed and Trending TODO: create Trending component
    <div className="home__container">
      <UserContext.Provider value={userData}>
        <Sidebar className="home__sidebar" />
        <Feed className="home__feed" />
      </UserContext.Provider>
    </div>
  );
}

export default Home;
