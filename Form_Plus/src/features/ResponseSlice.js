import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formDetail: {},
  formQuestions: [],
  formResponse: [],
};

export const ResponseSlice = createSlice({
  name: "response",
  initialState,
  reducers: {
      setInitialState: (state, action) => {
          // console.log("Initializing");
      const { _id, title, description, questions, answers } = action.payload;
      state.formDetail = { formId: _id, title, description };
      state.questions = questions;
      state.formResponse = answers;
    },
    setAnswer: (state, action) => {
      const { id, answer } = action.payload;

      const existingAnswer = state.formResponse.find((item) => item.questionId === id);

      if (existingAnswer) {
        
        if (Array.isArray(answer)) {
          existingAnswer.answer = answer; 
        } else {
          existingAnswer.answer = answer; 
        }
      } else {
       
        state.answer.push({ questionId:id,  answer });
      }
    },
  },
});

export const { setInitialState, setAnswer } = ResponseSlice.actions;
export default ResponseSlice.reducer;
