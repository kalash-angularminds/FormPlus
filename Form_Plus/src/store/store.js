import { configureStore } from "@reduxjs/toolkit";
import FormReducer from "../features/FormSlice"
import ResponseReducer from "@/features/ResponseSlice";

export const store = configureStore({
    reducer: {
    form: FormReducer,
    response: ResponseReducer,
  },
});
