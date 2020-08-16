import React, { Fragment } from "react";

const Clear = ({ clearUsers, thereAreUsers }) => (
  <Fragment>
    {thereAreUsers && (
      <button className="btn btn-light btn-block" onClick={clearUsers}>
        Clear
      </button>
    )}
  </Fragment>
);

export default Clear;
