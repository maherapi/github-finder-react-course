import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/common/Alert";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import User from "./components/users/User";
import NotFound from "./components/pages/NotFound";
import GithubState from "./context/github/githubState";
import AlertState from "./context/alert/alertState";

import "./App.css";

const App = () => (
  <GithubState>
    <AlertState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/about" component={About} />
              <Route exact path="/users/:login" component={User} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </AlertState>
  </GithubState>
);

export default App;
