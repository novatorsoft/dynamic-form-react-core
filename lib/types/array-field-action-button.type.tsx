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

  constructor(options: ArrayFieldRemoveButton) {
    options.label = options.label ?? "-";
    super(options);
    this.position = options.position ?? "right";
  }
}

export class ArrayFieldAddButton extends ArrayFieldButton {
  constructor(options: ArrayFieldRemoveButton) {
    options.label = options.label ?? "+";
    super(options);
  }
}
