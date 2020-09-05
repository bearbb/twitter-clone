import React from "react";
import "./App.css";
import Feed from "./layout/Feed/Feed.js";
import Signup from "./pages/login/Signup";
import Login from "./pages/login/Login";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import Homeless from "./pages/Homeless/Homeless";
import Home from "./layout/Home";
function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact component={Home}></Route>

          <Route path="/signup" exact component={Signup}></Route>

          <Route path="/login" exact component={Login}></Route>

          <Route path="/homeless" exact component={Homeless}></Route>
          <Route
            path="/post/:postId"
            exact
            component={({ match }) => {
              console.log(match);
              return (
                <div>{`this is post from postId ${match.params.postId}`}</div>
              );
            }}
          ></Route>

          <Route path="/" render={() => <div>404</div>}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
