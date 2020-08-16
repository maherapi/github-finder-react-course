import React from "react";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import { useReducer } from "react";
import {
  SET_LOADING,
  CLEAR_USERS,
  GET_REPOS,
  GET_USER,
  SEARCH_USERS,
} from "./githubActions";
import axios from "axios";

const apiKey = {
  clientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
  clientSecret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
};

const GithubState = (props) => {
  const initailState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initailState);

  const searchUser = async (text) => {
    dispatch({ type: SET_LOADING });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${apiKey.clientId}&client_secret=${apiKey.clientSecret}`
    );
    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };

  const getSingleUser = async (username) => {
    dispatch({ type: SET_LOADING });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${apiKey.clientId}&client_secret=${apiKey.clientSecret}`
    );
    dispatch({ type: GET_USER, payload: res.data });
  };

  const getUserRepos = async (username) => {
    dispatch({ type: SET_LOADING });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${apiKey.clientId}&client_secret=${apiKey.clientSecret}`
    );
    dispatch({ type: GET_REPOS, payload: res.data });
  };

  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUser,
        clearUsers,
        getSingleUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
