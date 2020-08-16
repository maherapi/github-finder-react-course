import React, { Component, Fragment } from "react";
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

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  searchUser = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${apiKey.clientId}&client_secret=${apiKey.clientSecret}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  getSingleUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${apiKey.clientId}&client_secret=${apiKey.clientSecret}`
    );
    this.setState({ user: res.data, loading: false });
  };

  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${apiKey.clientId}&client_secret=${apiKey.clientSecret}`
    );
    this.setState({ repos: res.data, loading: false });
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  showAlert = (alert) => {
    this.setState({ alert });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, loading, alert, user, repos } = this.state;
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
                      searchUser={this.searchUser}
                      showAlert={this.showAlert}
                    />
                    <Clear
                      thereAreUsers={users.length > 0}
                      clearUsers={this.clearUsers}
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
                    getSingleUser={this.getSingleUser}
                    getUserRepos={this.getUserRepos}
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
}

export default App;
