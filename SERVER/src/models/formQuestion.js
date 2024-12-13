import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: {
        values: [
          "text",
          "textarea",
          "number",
          "email",
          "multipleChoice",
          "checkbox",
          "dropdown",
          "file",
          "date",
          "radio",
        ],
        message: "{VALUE} is not a valid type",
      },
    },
    options: [String],
    required: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

const formQuestionSchema = new mongoose.Schema(
  {
    questions: [questionSchema],
  },
  { timestamps: true }
);

export const FormQuestion = mongoose.model("FormQuestion", formQuestionSchema);
