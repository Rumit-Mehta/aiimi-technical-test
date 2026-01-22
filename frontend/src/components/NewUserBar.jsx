import React from "react";
import "./NewUserBar.css";

export const NewUserBar = ({ onNewUser }) => {

  return (
    <div className="new-user-bar">
        <button
            type="button"
            className="new-user-button"
            onClick={onNewUser}
            >
            New User +
        </button>
    </div>
  );
};