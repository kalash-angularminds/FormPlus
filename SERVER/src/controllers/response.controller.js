import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Response } from "../models/response.js";
import { Form } from "../models/form.js";
import mongoose from "mongoose";

const saveResponse = asyncHandler(async (req, res) => {
  const { answers } = req.body;
  console.log("Answer: ", answers);
  const formId = req.params.id;
  if (!mongoose.isValidObjectId(formId)) {
    throw new ApiError(400, "Invalid form id");
  }
  if (answers.length === 0) {
    throw new ApiError(400, "Answers are required");
  }
  const form = await Form.findById(formId);
  if (!form) {
    throw new ApiError(404, "Form not found");
  }

  const updatedAnswers = answers.map((answer) => {
    if (!mongoose.Types.ObjectId.isValid(answer.questionId)) {
      throw new ApiError(400, `Invalid questionId: ${answer.questionId}`);
    }
    // Convert questionId to ObjectId
    answer.questionId = new mongoose.Types.ObjectId(answer.questionId);
    return answer;
  });

  const newResponse = new Response({
    formId,
    answers: updatedAnswers,
  });

  const savedResponse = await newResponse.save();

  return res
    .status(201)
    .json(new ApiResponse(200, savedResponse, "Response saved Successfully"));
});

const sendResponses = asyncHandler(async (req, res) => {
  const formId = req.params.id;

  if (!mongoose.isValidObjectId(formId)) {
    return res.status(400).json({ message: "Invalid formId" });
  }
  const responses = await Response.find({
    formId: formId,
  });
  console.log(responses);
  return res
    .status(201)
    .json(new ApiResponse(200, responses, "Request Successful"));
});

export { saveResponse, sendResponses };
