import z from "zod";

export const createUserSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(8).max(20, {
    message:
      "Password should be of atleast 8 characters and max of 20 characters ",
  }),
  gender: z.string(),
});

export const loginUserSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(8, {
      message:
        "Password should be of atleast 8 characters and max of 20 characters",
    })
    .max(20),
});

export const createCourseSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.number().min(0, { message: "Price should be positive" }),
});
