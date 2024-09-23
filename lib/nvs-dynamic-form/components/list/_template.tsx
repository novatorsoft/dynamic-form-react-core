import { IList } from "./_type";
import React from "react";

export const List = ({ items, color = "red" }: IList) => {
  const createItems = () => {
    return items.map((item, index) => (
      <li key={index} style={{ color }}>
        {item}
      </li>
    ));
  };

  return (
    <div className="nvs-container-fluid">
      <div className="nvs-row">
        <div className="nvs-col-12">
          <ul className="df-list">{createItems()}</ul>
        </div>
      </div>
    </div>
  );
};
