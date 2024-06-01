export class SubmitButton {
  component!: React.FC<any>;
  defaultOptions!: SubmitButtonOptions;
}

export class SubmitButtonOptions {
  label!: string;
  isFullWidth!: boolean;
  position!: "left" | "right" | "center";
}
