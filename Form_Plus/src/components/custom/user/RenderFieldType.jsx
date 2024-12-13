import React from "react";

import UserCheck from "@/components/ui/form/user/UserCheck";
import UserRadioGroup from "@/components/ui/form/user/UserRadioGroup";
import UserDropdown from "@/components/ui/form/user/UserDropdown";
import UserInput from "@/components/ui/form/user/UserInput";
import UserTextarea from "@/components/ui/form/user/UserTextarea";

function RenderFieldType({question}) {
    const { options, type, required,  _id } = question;
    // console.log("answer: ", answer);

    const InputTypeMap = {
        checkbox: UserCheck,
        radio: UserRadioGroup,
        dropdown: UserDropdown,
        textarea: UserTextarea,
    };
    // console.log("type: ", type)
    const RenderComponent = InputTypeMap[type] || UserInput;
    // console.log("ok: ", RenderComponent)

    // Handle the change for different input types
  


    return (
        <RenderComponent
            options={options}
            type={type}
            required={required}
            disabled={false}
            id ={_id}
        />
    );
}

export default RenderFieldType;
