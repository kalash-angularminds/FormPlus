import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Form } from "../models/form.js";
import { FormQuestion } from "../models/formQuestion.js";
import mongoose from "mongoose";
import { Response } from "../models/response.js";

const createForm = asyncHandler(async (req, res) => {
  const { title, description, questions } = req.body;

  if (title.trim() === "") {
    throw new ApiError(400, "Title is required");
  }
  if (questions.length === 0) {
    throw new ApiError(400, "At least one question is required");
  }

  // Saving questions
  const formQuestions = new FormQuestion({
    questions,
  });
  const savedFormQuestions = await formQuestions.save();

  //Saving form
  const newForm = new Form({
    title,
    description,
    questions: savedFormQuestions._id,
  });

  const savedForm = await newForm.save();

  return res
    .status(201)
    .json(new ApiResponse(200, savedForm, "Form created Successfully"));
});

const getForm = asyncHandler(async (req, res) => {
  const formId = req.params.id;
  if (!mongoose.isValidObjectId(formId)) {
    throw new ApiError(400, "Enter a valid form id");
  }
  const form = await Form.findById(formId).populate("questions");
  if (!form) {
    throw new ApiError(404, "Form not found");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, form, "Form fetched Successfully"));
});

const getAllForms = asyncHandler(async (req, res) => {
  const forms = await Form.find({});
  return res
    .status(201)
    .json(new ApiResponse(200, forms, "Forms fetched Successfully"));
});

const deleteForm = asyncHandler(async (req, res) => {
  const formId = req.params.id;
  const { questionId } = req.body;
  await Form.deleteOne({ _id: formId })
  await FormQuestion.deleteOne({ _id: questionId });
     
  return res
    .status(201)
    .json(new ApiResponse(200, "Form deleted Successfully"));
});

//update form
const updateForm = asyncHandler(async (req, res) => {
  const formId = req.params.id;
  const { title, description, questions, questionId } = req.body;

  if (!mongoose.isValidObjectId(formId)) {
    return res.status(400).json({ message: "Invalid formId" });
  }
  const form = await Form.findById(formId).populate("questions");
  if (!form) {
    return res.status(404).json({ message: "Form not found" });
  }

  const questionDb = await FormQuestion.findById(questionId);
  if (!questionDb) {
    return res.status(404).json({ message: "Form not found" });
  }
  console.log("req:", req.body)
console.log("form: ", form);
  console.log("qdb: ", questionDb);
  // console.log("payload questions: ", questions);

  if (title) form.title = title;
  if (description) form.description = description;
  if (questions) questionDb.questions = questions;
 const result = await Response.deleteMany({
   formId: formId,
 });

  // const updatedQuestions = questions.map((question) => {
  //   // If question has an ID, update the existing question
  //   if (question._id) {
  //     const existingQuestionIndex = form.questions.questions.findIndex(
  //       (q) => q._id.toString() === question._id.toString()
  //     );
  //     if (existingQuestionIndex !== -1) {
  //       const existingQuestion =
  //         form.questions.questions[existingQuestionIndex];

  //       if (question.title) existingQuestion.title = question.title;
  //       if (question.type) existingQuestion.type = question.type;
  //       if (question.options) existingQuestion.options = question.options;
  //       if (question.required !== undefined)
  //         existingQuestion.required = question.required;
  //       if (question.deleted !== undefined)
  //         existingQuestion.deleted = question.deleted;
  //       questionDb.questions[existingQuestionIndex] = existingQuestion;
  //       // console.log("e", existingQuestion.title);
  //       // console.log("n", form.questions.questions[existingQuestionIndex]);
  //     }
  //   } else {
  //     const newQuestion = {
  //       title: question.title,
  //       type: question.type,
  //       options: question.options || [],
  //       required: question.required || false,
  //       deleted: question.deleted || false,
  //     };
  //     questionDb.questions.push(newQuestion);
  //   }
  // });

  // Save the updated form
  
  const savedQuestion = await questionDb.save();
  const savedForm = await form.save();
  console.log("result", result);
  console.log("s question", savedQuestion);
  console.log("s form",savedForm);
  return res
    .status(201)
    .json(new ApiResponse(200, "Form updated Successfully"));
});

export { createForm, getForm, getAllForms, deleteForm, updateForm };
