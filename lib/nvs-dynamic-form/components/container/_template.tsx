import { IContainer } from "./_type";
import React from "react";

export const Container = ({
  containerComponent: CustomContainer,
  options = {},
  children,
}: IContainer) => {
  return <CustomContainer {...options}>{children}</CustomContainer>;
};
