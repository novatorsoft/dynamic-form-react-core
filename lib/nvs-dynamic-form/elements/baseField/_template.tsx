export const createFieldItemClass = (screenSize: number | { desktop: number, tablet?: number, mobile?: number }): string => {
  const className: Array<string> = [];
  if (typeof screenSize === "number") className.push("nvs-col-" + screenSize);
  else {
    className.push("nvs-col-md-" + screenSize.desktop);
    if (screenSize.tablet) className.push("nvs-col-sm-" + screenSize.tablet);
    if (screenSize.mobile) className.push("nvs-col-xs-" + screenSize.mobile);
  }
  return className.join(" ");
};
