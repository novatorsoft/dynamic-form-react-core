import React from "react";

export const Container = ({ children, ...props }) => {
  return (
    <div id="custom-container" className="nvs-container-fluid">
      <div className="nvs-row">
        <div className="nvs-col-12">
          <h1>{props.title}</h1>
        </div>
        <div className="nvs-col-12">{children}</div>
      </div>
    </div>
  );
};
