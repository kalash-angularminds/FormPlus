import React from "react";
import CustCheckBox from "../ui/form/CustCheckBox";
import CustRadioGroup from "../ui/form/CustRadioGroup";
import CustDropdown from "../ui/form/CustDropdown";
import { Input } from "../ui/input";


function FormFieldType({ index, type, required }) {
  const InputTypeMap = {
    checkbox: CustCheckBox,
    radio: CustRadioGroup,
    dropdown: CustDropdown,
  };

  const RenderComponent = InputTypeMap[type] || Input;

  return (
    <RenderComponent
      index={index}
      type={type}
      required={required}
      disabled={true}
    />
  );
}

export default FormFieldType;
