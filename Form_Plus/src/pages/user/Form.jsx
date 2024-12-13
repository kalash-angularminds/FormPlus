import { BASE_URL } from "@/constants";
import RenderFormLayout from "@/layouts/RenderFormLayout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RenderFormBanner from "@/components/custom/user/RenderFormBanner";
import RenderFormQuestions from "@/components/custom/user/RenderFormQuestions";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setInitialState } from "../../features/ResponseSlice";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

function Form() {
  const [submit, setSubmit] = useState(false);
  const { toast } = useToast();
  const { id } = useParams();
  const dispatch = useDispatch();
  const formTitle = useSelector((state) => state.response.formDetail.title);
  const formDescription = useSelector(
    (state) => state.response.formDetail.description,
  );
  const formResponse = useSelector((state) => state.response.formResponse);
  async function getFormStructure() {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      console.log("response getting form", response.data.data);
      return response.data.data;
    } catch (error) {
      console.log("Error getting form: ", error);
    }
  }
  async function submitResponse(e) {
    e.preventDefault();
    const missingRequiredAnswer = formResponse.find(
      (answer) =>
        answer.required &&
        (answer.answer === "" ||
          (Array.isArray(answer.answer) && answer.answer.length === 0)),
    );

    // console.log("missing ans ", missingRequiredAnswer);

    if (missingRequiredAnswer) {
      toast({
        title: `Missing Answer for "${missingRequiredAnswer.question}"`,
        description: "This question is required and must have an answer",
        variant: "destructive",
      });
      return;
    }

    console.log({ answers: formResponse });
    try {
      const response = await axios.post(`${BASE_URL}/${id}`, {
        answers: formResponse,
      });
      console.log("response submitted", response);
      // console.log(response.data);
      if (response?.status === 201) {
        toast({
          title: `Form submitted successfully!`,
        });
        setSubmit(true);
      }
    } catch (error) {
      console.log("Error getting form: ", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await getFormStructure();

      const answersArray = res?.questions.questions.map((question) => {
        return {
          questionId: question._id,
          question: question.title,
          type: question.type,
          required: question.required,
          answer: question.type === "checkbox" ? [] : "",
        };
      });

      const payload = {
        _id: res._id,
        title: res.title,
        description: res.description,
        questions: res.questions.questions,
        answers: answersArray,
      };

      dispatch(setInitialState(payload));
    };

    fetchData();
  }, [id, dispatch]);

  return (
    <RenderFormLayout>
      <RenderFormBanner title={formTitle} description={formDescription} />
      {!submit ? (
        <form onSubmit={submitResponse}>
          <RenderFormQuestions />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      ) : <>
          <h1 className="text-center text-2xl text-green-600">Form submitted successfully!!</h1>
      </> }
    </RenderFormLayout>
  );
}

export default Form;
