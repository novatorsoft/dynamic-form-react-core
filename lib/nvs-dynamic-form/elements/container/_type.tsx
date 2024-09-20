import { ReactNode } from "react";

export interface IContainer {
  containerComponent: React.FC<any>;
  options?: { [key: string]: any };
  children?: ReactNode;
}
