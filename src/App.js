import React, { Fragment, useState } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Clear from "./components/users/Clear";
import Alert from "./components/common/Alert";

import axios from "axios";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import About from "./components/pages/About";
import User from "./components/users/User";

const apiKey = {
  clientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
  clientSecret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const searchUser = async (text) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${apiKey.clientId}&client_secret=${apiKey.clientSecret}`
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  const getSingleUser = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${apiKey.clientId}&client_secret=${apiKey.clientSecret}`
    );
    setUser(res.data);
    setLoading(false);
  };

  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${apiKey.clientId}&client_secret=${apiKey.clientSecret}`
    );
    setRepos(res.data);
    setLoading(false);
  };

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => setAlert(null), 5000);
  };

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Fragment>
                    <Search
                      searchUser={searchUser}
                      showAlert={showAlert}
                    />
                    <Clear
                      thereAreUsers={users.length > 0}
                      clearUsers={clearUsers}
                    />
                    <Users users={users} loading={loading} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/users/:login"
                render={(props) => (
                  <User
                    {...props}
                    user={user}
                    repos={repos}
                    getSingleUser={getSingleUser}
                    getUserRepos={getUserRepos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
}

export default App;
