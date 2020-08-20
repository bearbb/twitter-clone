import React from "react";
import "./App.css";
import Sidebar from "./layout/Sidebar/Sidebar";
import Feed from "./layout/Feed/Feed.js";
import Widget from "./layout/Widget/Widget.js";
function App() {
  return (
    <div className="app">
      {/* Sidebar */}
      <Sidebar />
      {/* Feed */}
      <Feed />
      {/* Widget */}
      <Widget />
    </div>
  );
}

export default App;
