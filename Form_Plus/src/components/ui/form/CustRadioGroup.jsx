import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../button";
import { Input } from "../input";
import { useDispatch, useSelector } from "react-redux";
import { addOptions, deleteOption, setOptionText } from "@/features/FormSlice";
import { CircleX } from "lucide-react";

function CustRadioGroup({ index }) {
  const question = useSelector((state) => state.form.questions[index]);
  const options = question?.options;
  const dispatch = useDispatch();

  return (
    <div>
      <RadioGroup>
        {options?.map((option, i) => (
          <div key={i} className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" disabled />
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
          <RadioGroupItem value="option-one" id="option-one" disabled />
          <Button
            className="text-blue-500"
            type="button"
            variant="link"
            onClick={() => dispatch(addOptions(index))}
          >
            +Add option
          </Button>
        </div>
      </RadioGroup>
    </div>
  );
}

export default CustRadioGroup;
