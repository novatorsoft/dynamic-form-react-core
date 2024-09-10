import { ISubmitButton } from "./_type";
import React from "react";

export const Button = ({
  buttonComponent: ButtonComponent,
  visible,
  label,
  position = "right",
  isFullWidth,
  containerClass,
}: ISubmitButton) => {
  const getButtonPositionClass = (position: "left" | "right" | "center") => {
    const classes = {
      left: "nvs-jc-start",
      right: "nvs-jc-end",
      center: "nvs-jc-center",
    };
    return classes[position];
  };

  const getSubmitButtonClasses = () => {
    const buttonClasses = ["df-button"];

    isFullWidth && buttonClasses.push("nvs-col-12");

    return buttonClasses.join(" ");
  };

  return visible ? (
    <div
      className={`nvs-container-fluid${containerClass ? ` ${containerClass}` : ""}`}
    >
      <div className={`nvs-row ${getButtonPositionClass(position)}`}>
        <div className={getSubmitButtonClasses()}>
          <ButtonComponent>{label}</ButtonComponent>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
