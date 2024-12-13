import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../../label";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "@/features/ResponseSlice";

function UserCheck({ options, id }) {
  const dispatch = useDispatch();
  const checkArray = useSelector((state) => {
    const answer = state.response.formResponse.find(
      (item) => item.questionId === id,
    );
    return answer ? answer.answer : [];
  });
  //checked={field.value}
  //onCheckedChange={field.onChange}
  function handleChange(e) {
    const { name, checked } = e.target;

    if (checked) {
      if (!checkArray.includes(name)) {
        dispatch(setAnswer({ id, answer: [...checkArray, name] }));
      }
    } else {
      dispatch(
        setAnswer({ id, answer: checkArray.filter((item) => item !== name) }),
      );
    }
  }
  return (
    <>
      {/* {options?.map((option, i) => (
        <div key={i} className="flex items-center space-x-2 mb-1">
          <Checkbox
            checked={checkArray.includes(option)}
            onCheckedChange={handleChange}
            name={option}
          />
          <Label>{option}</Label>
        </div>
      ))} */}
      {options?.map((option, i) => (
        <div key={i} className="flex items-center space-x-2 mb-1">
          <input
            type="checkbox"
            checked={checkArray.includes(option)} 
            onChange={handleChange} 
            name={option} 
          />
          <label>{option}</label>
        </div>
      ))}
    </>
  );
}

export default UserCheck;
