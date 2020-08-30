import React from "react";
import "./App.css";
import Sidebar from "./layout/Sidebar/Sidebar";
import Feed from "./layout/Feed/Feed.js";
import Widget from "./layout/Widget/Widget.js";
import Signup from "./pages/login/Signup";
import Login from "./pages/login/Login";
function App() {
  return (
    <div className="app">
      {/* Sidebar */}
      {/* <Sidebar /> */}
      {/* Feed */}
      {/* <Feed /> */}
      {/* Widget */}
      {/* <Widget /> */}
      <Signup />
      {/* <Login></Login> */}
    </div>
  );
}

export default App;
