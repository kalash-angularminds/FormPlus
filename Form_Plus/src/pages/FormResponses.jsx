import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BASE_URL } from "@/constants";
import axios from "axios";

function FormResponses() {
  const [responses, setResponses] = useState([]);
  const { id } = useParams();

  const questions = useSelector((state) => state.form?.questions);
  // console.log(questions)
  const formTitle = useSelector((state) => state.form.title);
  const formDescription = useSelector((state) => state.form.description);

  async function getResponses() {
    try {
      const response = await axios.get(`${BASE_URL}/responses/${id}`);
      console.log("response.data.data", response.data.data);
      setResponses(response.data.data);
      // return response.data.data;
    } catch (error) {
      console.log("Error getting form: ", error);
    }
  }

  useEffect(() => {
    getResponses();
  }, []);

  return (
      <div className="p-20 bg-blue-100">
          <div className="w-full flex justify-center mb-2 border border-b-gray-900">
              <h1 className="text-xl">
                  {formTitle}
        </h1>
        
          </div>
      <Table>
              <TableCaption>{ formDescription}</TableCaption>
        <TableHeader>
          <TableRow>
            {questions?.map((question, index) => (
              <TableHead key={index}>{question.title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {responses?.map((res, index) => (
            <TableRow key={res._id}>
              {res?.answers?.map((ans) => (
                  <TableCell key={ans.questionId}>
                      {Array.isArray(ans.answer) ? ans.answer.join(",") : ans.answer}
                  </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default FormResponses;
