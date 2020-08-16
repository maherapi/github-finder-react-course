import React from "react";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { useReducer } from "react";
import { SHOW_ALERT, REMOVE_ALERT } from "./alertActions";

const AlertState = (props) => {
  const initailState = null;

  const [state, dispatch] = useReducer(AlertReducer, initailState);

  const showAlert = (alert) => {
    dispatch({type: SHOW_ALERT, payload: alert });
    setTimeout(() => dispatch({ type: REMOVE_ALERT}), 5000);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        showAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
