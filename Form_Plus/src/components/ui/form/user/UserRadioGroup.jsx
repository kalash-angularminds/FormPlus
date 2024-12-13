import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../../label";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "@/features/ResponseSlice";


function UserRadioGroup({ id, options }) {
    const dispatch = useDispatch();
    const currentSelected = useSelector(state => {
        const answer = state.response.formResponse.find(item => item.questionId === id);
        return answer ? answer.answer : '';
    });
    function handleChange(value) {
        dispatch(setAnswer({ id, answer: value }));
    }
   
    return (
        <div>
            <RadioGroup onValueChange={handleChange} value={currentSelected} > 
                {options?.map((option, i) => (
                    <div key={i} className="flex items-center space-x-2">
                        <RadioGroupItem value={`${option}`} />
                        <Label >{option}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}

export default UserRadioGroup;
