import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "@/features/ResponseSlice";

function UserDropdown({ id, options }) {
  const dispatch = useDispatch();
  const currentSelected = useSelector(state => {
    const answer = state.response.formResponse.find(item => item.questionId === id);
    return answer ? answer.answer : '';
  });
  function handleChange(value) {
    dispatch(setAnswer({ id, answer: value }));
  }
  return (
    <>
      <Select
        defaultValue={currentSelected}
        onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent >
          {options?.map((option, i) => (
            <div key={i} className="flex items-center space-x-2 ">
              <SelectItem value={option}>{option}</SelectItem>
            </div>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}

export default UserDropdown;
