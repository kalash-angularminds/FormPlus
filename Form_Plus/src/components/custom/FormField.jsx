import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuestionTitle,
  setQuestionType,
  deleteQuestion,
  setActiveCard,
  setQuestionRequired,
} from "@/features/FormSlice";

import FormFieldType from "./FormFieldType";

function FormField({ index }) {
  const activeCard = useSelector((state) => state.form?.activeQuestionIndex);
  const question = useSelector((state) => state.form?.questions[index]);
  const questionTitle = question?.title;
  const questionType = question?.type;
  const questionRequired = question?.required;
  const dispatch = useDispatch();

  function handleQuestionTitleChange(e) {
    e.preventDefault();
    dispatch(setQuestionTitle(e.target.value));
  }
  function handleQuestionTypeChange(value) {
    dispatch(setQuestionType(value));
  }

  const handleSwitchChange = (checked) => {
    dispatch(setQuestionRequired(checked));
  };

  return (
    <Card
      className={`${activeCard == index ? "border-l-green-500 border-l-4" : ""}`}
      onClick={() => dispatch(setActiveCard(index))}
    >
      <CardHeader>
        <Input
          className="w-3/6"
          id="question_title"
          placeholder="Untitled Question"
          required
          value={questionTitle}
          onChange={handleQuestionTitleChange}
        />
        <div className="flex justify-end gap-2">
        <span
          className="text-red-500 cursor-pointer"
          onClick={() => dispatch(deleteQuestion(index))}
        >
          <Trash2 size={25} />
        </span>
        <Separator
          className="h-[30px] border border-neutral-400"
          orientation="vertical"
        />
        <Label htmlFor="required">Required</Label>
        <Switch
          id="required"
          checked={questionRequired}
          onCheckedChange={handleSwitchChange}
          />
        </div>
        {/*<Select
          defaultValue={questionType}
          onValueChange={handleQuestionTypeChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Field Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              
              <SelectItem value="text">Short answer</SelectItem>
              <SelectItem value="textarea">Paragraph</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="number">Phone</SelectItem>
              <SelectItem value="file">File Upload</SelectItem>
              <SelectItem value="checkbox">Checkbox</SelectItem>
              <SelectItem value="radio">Radio</SelectItem>
              <SelectItem value="dropdown">Dropdown</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>*/}
      </CardHeader>
      <CardContent>
        <FormFieldType
          index={index}
          type={questionType}
          required={questionRequired}
        />
      </CardContent>
      {/* <CardFooter className="justify-end gap-2">
        <span
          className="text-red-500 cursor-pointer"
          onClick={() => dispatch(deleteQuestion(index))}
        >
          <Trash2 size={25} />
        </span>
        <Separator
          className="h-[30px] border border-neutral-400"
          orientation="vertical"
        />
        <Label htmlFor="required">Required</Label>
        <Switch
          id="required"
          checked={questionRequired}
          onCheckedChange={handleSwitchChange}
        />
      </CardFooter> */}
    </Card>
  );
}

export default FormField;
