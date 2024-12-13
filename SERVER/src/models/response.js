import mongoose from "mongoose";

const responseSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        answer: {
          type: mongoose.Schema.Types.Mixed,
          required: true,
        },
        question: {
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
      },
    ],
  },
  { timestamps: true }
);

export const Response = mongoose.model("Response", responseSchema);
