import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: JSON.parse(localStorage.getItem("FormTitle")) || "",
  description: JSON.parse(localStorage.getItem("FormDescription")) || "",
  questions: JSON.parse(localStorage.getItem("FormQuestions")) || [],
  activeQuestionIndex: JSON.parse(localStorage.getItem("totalPrice")) || null,
};

export const FormSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      const { _id, title, description, questions } = action.payload;
      state.title = title;
      state.description = description;
      state.questions = questions;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setActiveCard: (state, action) => {
      state.activeQuestionIndex = action.payload;
    },
    addQuestion: (state, action) => {
     const { type } = action?.payload || { type: "text" };
      const newQuestion = {
        title: "",
        type,
        required: false,
        deleted: false,
      };
      console.log("new question", newQuestion);
      state.questions.push(newQuestion);
      state.activeQuestionIndex = state.questions.length - 1;
    },
    setQuestionTitle: (state, action) => {
      const questionTitle = action.payload;
      const question = state.questions[state.activeQuestionIndex];
      question.title = questionTitle;
    },
    setQuestionType: (state, action) => {
      const questionType = action.payload;
      const question = state.questions[state.activeQuestionIndex];
      question.type = questionType;
    },
    setQuestionRequired: (state, action) => {
      const questionRequired = action.payload;
      const question = state.questions[state.activeQuestionIndex];
      question.required = questionRequired;
    },
    deleteQuestion: (state, action) => {
      state.questions.splice(action.payload, 1);
    },
    addOptions: (state, action) => {
      const index = action.payload;
      const question = state.questions[index];
      const option = "";
      if (question) {
        if (Array.isArray(question.options)) {
          question.options.push(option);
        } else {
          question.options = [option];
        }
      }
    },
    setOptionText: (state, action) => {
      const { index, option } = action.payload;
      const question = state.questions[state.activeQuestionIndex];
      const options = question.options;
      options[index] = option;
    },
    deleteOption: (state, action) => {
      const index = action.payload;
      const question = state.questions[state.activeQuestionIndex];
      const option = question.options;
      option.splice(index, 1);
    },
  },
});

export const {
  setInitialState,
  setTitle,
  setDescription,
  setActiveCard,
  addQuestion,
  setQuestionTitle,
  setQuestionType,
  setQuestionRequired,
  deleteQuestion,
  addOptions,
  setOptionText,
  deleteOption,
} = FormSlice.actions;
export default FormSlice.reducer;
