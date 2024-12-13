import FormBanner from "@/components/custom/FormBanner";
import FormField from "@/components/custom/FormField";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/constants";

import { addQuestion, setInitialState } from "@/features/FormSlice";
import axios from "axios";
import { CirclePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function UpdateForm() {
  const [apiPayload, setApiPayload] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.form?.questions);
  const formTitle = useSelector((state) => state.form.title);
  const formDescription = useSelector((state) => state.form.description);

  async function getFormStructure() {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      console.log("response.data.data", response.data.data);
      return response.data.data;
    } catch (error) {
      console.log("Error getting form: ", error);
    }
  }
  async function updateForm(e) {
    e.preventDefault();
    const payload = {
      title: formTitle,
      description: formDescription,
      questions,
      questionId: apiPayload.questionId,
    };
    console.log("payload: ", payload);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/form/update-form/${id}`,
        payload,
      );
      console.log("response: ", response);
      if (response?.status === 201) {
        console.log(response?.data);
      }
    } catch (error) {
      console.log("Error creating form: ", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await getFormStructure(id);
      if (res) {
        const payload = {
          _id: res._id,
          title: res.title,
          description: res.description,
          questions: res.questions?.questions,
          questionId: res.questions._id,
        };
        setApiPayload(payload);
        dispatch(setInitialState(payload));
      }
    };

    fetchData();
  }, [id, dispatch]);

  return (
    <>
      <form>
        <FormBanner />
        {questions?.map((question, index) => (
          <FormField key={index} index={index} />
        ))}
        <Button className="w-full text-2xl" type="submit" onClick={updateForm}>
          Save changes
        </Button>
      </form>
    </>
  );
}

export default UpdateForm;
