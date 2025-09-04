import React from "react";
const passthrough = (Tag: any = "div") =>
  function C(props: any) { return <Tag {...props} />; };

export const Spacer = passthrough();
export const Divider = passthrough();
export const Modal = passthrough();
export const Spinner = passthrough();
export const Image = passthrough();
export const SelectItem = passthrough();
export default {};
