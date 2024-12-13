import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    questions: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FormQuestion",
      required: [true, "Questions are required"],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Form = mongoose.model("Form", formSchema);
