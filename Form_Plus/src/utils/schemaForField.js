import * as z from "zod";

const createSchemaForField = (question) => {
  const { type, options, required } = question;
  const getBaseSchema = (isRequired) =>
    isRequired
      ? z.string().min(1, "This field is required")
      : z.string().optional();

  switch (type) {
    case "email":
      return required
        ? z
            .string()
            .email({ message: "Invalid email address" })
            .min(1, "This field is required")
        : z.string().email({ message: "Invalid email address" }).optional();

    case "checkbox":
      return required
        ? z.array(z.string()).refine((value) => value.some((item) => item), {
            message: "You have to select at least one item.",
          })
        : z.array(z.string()).optional();

    case "dropdown":
    case "radio":
      return options
        ? required
          ? z.enum(options).min(1, "This field is required")
          : z.enum(options).optional()
        : getBaseSchema(required);

    case "date":
      return getBaseSchema(required);

    case "number":
      return required
        ? z.number().min(1, "This field is required")
        : z.number();

    case "file":
      return required
        ? z
            .instanceof(FileList)
            .refine(
              (files) => files.length > 0,
              `This field is required and must contain at least one file`,
            )
        : z.instanceof(FileList).optional();

    default:
      return getBaseSchema(required);
  }
};

export default createSchemaForField;
