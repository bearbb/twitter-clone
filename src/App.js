import React from "react";
import "./App.css";
import Sidebar from "./layout/Sidebar/Sidebar";
import Feed from "./layout/Feed/Feed.js";
function App() {
  return (
    <div className="App">
      <h1>THIS IS A TWITTER CLONE</h1>
      {/* Sidebar */}
      <Sidebar />
      {/* Feed */}
      <Feed />
      {/* Widget */}
    </div>
  );
}

export default App;
