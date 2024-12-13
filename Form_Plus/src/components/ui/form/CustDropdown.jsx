import React from "react";
import { Input } from "../input";
import { Button } from "../button";
import { CircleX } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addOptions, deleteOption, setOptionText } from "@/features/FormSlice";

function CustDropdown({ index }) {
  const question = useSelector((state) => state.form.questions[index]);
  const options = question?.options;
  const dispatch = useDispatch();

  return (
    <>
      {options?.map((option, i) => (
        <div key={i} className="flex items-center space-x-2 mb-2">
          <span>{i + 1}.</span>
          <Input
            className="w-3/6"
            id="option_text"
            placeholder={`Option ${i + 1}`}
            required
            value={option}
            onChange={(e) =>
              dispatch(setOptionText({ index: i, option: e.target.value }))
            }
          />
          <span
            className="text-red-400 cursor-pointer"
            onClick={() => dispatch(deleteOption(i))}
          >
            <CircleX size={25} />
          </span>
        </div>
      ))}
      <div className="flex items-center space-x-2">
        <Button
          className="text-blue-500"
          type="button"
          variant="link"
          onClick={() => dispatch(addOptions(index))}
        >
          +Add option
        </Button>
      </div>
    </>
  );
}

export default CustDropdown;
