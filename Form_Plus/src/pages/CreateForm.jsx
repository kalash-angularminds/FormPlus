import React, { useEffect } from "react";
import CreateFormLayout from "@/layouts/CreateFormLayout";
import FormBanner from "@/components/custom/FormBanner";
import FormField from "@/components/custom/FormField";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion, setInitialState } from "@/features/FormSlice";
import { CirclePlus } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast"


function CreateForm() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.form.questions);
  const formTitle = useSelector((state) => state.form.title);
  const formDescription = useSelector((state) => state.form.description);
  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      title: formTitle,
      description: formDescription,
      questions,
    };
    console.log("payload: ", payload);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/form/create-form`,
        payload,
      );
      console.log("response: ", response);
      if (response?.status === 201) {
        toast({
          title: "Form Created"
        })
        console.log(response?.data);
      }
    } catch (error) {
      console.log("Error creating form: ", error);
    }
  }

  useEffect(() => {
    const payload = {
      title: "",
      description: "",
      questions: [],
    };
    
    dispatch(setInitialState(payload)); 
    
  },[])

  return (
    <CreateFormLayout>
      <form>
      <FormBanner />
      {questions.map((question, index) => (
        <FormField key={index} index={index} />
      ))}
      <div className="flex justify-end">
        <span
          className="cursor-pointer text-white"
          onClick={() => dispatch(addQuestion())}
        >
          <CirclePlus size={40}></CirclePlus>
        </span>
        <Button type="submit" onClick={handleSubmit}>
          Create Form 
        </Button>
        </div>
      </form>
    </CreateFormLayout>
  );
}

export default CreateForm;
