export class ArrayFieldButton {
  label?: string;
  options?: { [key: string]: any };

  constructor(options: ArrayFieldButton) {
    this.label = options.label;
    this.options = options.options ?? {};
  }
}

export class ArrayFieldRemoveButton extends ArrayFieldButton {
  position?: "bottom" | "right";
  visible?: boolean;

  constructor(options: ArrayFieldRemoveButton) {
    options.label = options.label ?? "-";
    super(options);
    this.position = options.position ?? "right";
    this.visible = options.visible ?? true;
  }
}

export class ArrayFieldAddButton extends ArrayFieldButton {
  constructor(options: ArrayFieldRemoveButton) {
    options.label = options.label ?? "+";
    super(options);
  }
}
