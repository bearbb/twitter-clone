import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Feed from "./Feed/Feed";
import Sidebar from "./Sidebar/Sidebar";
import { UserContext } from "./UserContext";
import "./Home.css";
import axios from "axios";
function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFetchingLoggedInStatus, setIsFetchingLoggedInStatus] = useState(
    true
  );
  const [userData, setUserData] = useState({});
  const [isFetchingUserData, setIsFetchingUserData] = useState(false);
  const history = useHistory();
  //CHECK IF USER IS LOGGED IN OR NOT
  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  useEffect(() => {
    async function getStatus() {
      try {
        setIsFetchingLoggedInStatus(true);
        const res = await axios.get("/isLoggedIn", { withCredentials: true });
        console.log(res.data.isLoggedIn);
        setIsLoggedIn(res.data.isLoggedIn);
        if (res.data.isLoggedIn === false) {
          history.push("/homeless");
        } else {
          //fetching user data
          async function fetchData() {
            try {
              setIsFetchingUserData(true);
              const res = await axios.get("/user", { withCredentials: true });
              // console.log(res.data);
              setUserData(res.data);
              setIsFetchingUserData(false);
            } catch (err) {
              setIsFetchingUserData(false);
              console.error(err);
            }
          }
          fetchData();
        }
        await timeout(5000);
      } catch (err) {
        console.error(err);
      }
    }
    getStatus();
    return setIsFetchingLoggedInStatus(false);
  }, []);

  //IF USER IS LOGGED IN THEN FETCH USER DATA AND PASS TO TWEET BOX);
  const logout = () => {
    axios
      .post("/logout", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    //Component display Sidebar, Feed and Trending TODO: create Trending component
    //TODO: set a loading state to tweet box and tweet box

    //TODO: when first access to home site and when fetching logged in status show twitter icon
    //After fetching do render it out
    //Conditionally render these only when user is logged in
    <div>
      {!isLoggedIn ? (
        <h1>Twitter icon</h1>
      ) : (
        <div className="home__container">
          <UserContext.Provider value={userData}>
            <Sidebar className="home__sidebar" />
            <Feed className="home__feed" />
          </UserContext.Provider>
        </div>
      )}
      <button
        onClick={() => {
          logout();
        }}
      >
        LOGOUT
      </button>
    </div>
  );
}

export default Home;
