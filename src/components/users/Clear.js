import React, { Fragment, useContext } from "react";
import GithubContext from "../../context/github/githubContext";

const Clear = () => {
  const githubContext = useContext(GithubContext);
  const { clearUsers } = githubContext;
  const thereAreUsers = githubContext.users.length > 0;
  return (
    <Fragment>
      {thereAreUsers && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </Fragment>
  );
};

export default Clear;
