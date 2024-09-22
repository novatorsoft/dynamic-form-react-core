export class LabelOptions {
  class?: string;

  constructor(options: LabelOptions) {
    this.class = options.class ?? "";
  }
}
