import { ISubmitButton } from "./_type";
import React from "react";

export const SubmitButton = ({
  button,
  submitButtonVisible = true,
  submitButtonLabel = button.defaultOptions.label,
  submitButtonIsFullWidth = button.defaultOptions.isFullWidth,
  submitButtonPosition = button.defaultOptions.position,
  submitButtonContainerClass,
}: ISubmitButton) => {
  const getSubmitButtonComponent = () => {
    const SubmitButton = button.component;
    return <SubmitButton>{submitButtonLabel}</SubmitButton>;
  };

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

    submitButtonIsFullWidth && buttonClasses.push("nvs-col-12");

    return buttonClasses.join(" ");
  };

  return submitButtonVisible ? (
    <div
      className={`nvs-container-fluid${submitButtonContainerClass ? ` ${submitButtonContainerClass}` : ""}`}
    >
      <div
        className={`nvs-row ${getButtonPositionClass(submitButtonPosition)}`}
      >
        <div className={getSubmitButtonClasses()}>
          {getSubmitButtonComponent()}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
