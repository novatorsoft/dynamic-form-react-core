import React from "react";

export const ButtonComponent = ({
  children,
  type = "submit",
  onClick = () => {},
}: {
  children: string;
  type: "submit" | "reset" | "button";
  onClick?: () => void;
}) => {
  return (
    <button onClick={onClick} style={{ width: "100%" }} type={type}>
      {children}
    </button>
  );
};
