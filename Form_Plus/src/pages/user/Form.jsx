import { BASE_URL } from "@/constants";
import RenderFormLayout from "@/layouts/RenderFormLayout";
import axios from "axios";
import React, { useEffect } from "react";
import RenderFormBanner from "@/components/custom/user/RenderFormBanner";
import RenderFormQuestions from "@/components/custom/user/RenderFormQuestions";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setInitialState } from "../../features/ResponseSlice";
import { useParams } from "react-router-dom";

function Form() {
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const formTitle = useSelector(state => state.response.formDetail.title);
  const formDescription = useSelector(state => state.response.formDetail.description);
  const formResponse = useSelector(state => state.response.formResponse);
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
    // e.preventDefault();
    console.log({ answers: formResponse });
    try {
      const response = await axios.post(`${BASE_URL}/${id}`, {answers:formResponse});
      console.log("response submitted", response);
      console.log(response.data);
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
      <form onSubmit={submitResponse}>
        <RenderFormQuestions  />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </RenderFormLayout>
  );
}

export default Form;
