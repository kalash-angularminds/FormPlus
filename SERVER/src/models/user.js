import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      validate: {
        validator: function (value) {
          const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
          const alphanumericRegex =
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
          return specialCharRegex.test(value) && alphanumericRegex.test(value);
        },
        message:
          "Password must contain at least one letter, one number, and one special character",
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
