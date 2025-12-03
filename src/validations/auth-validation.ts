import z from "zod";

export const loginSchemaForm = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginForm = z.infer<typeof loginSchemaForm>;

export const createUserSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  // avatar_url: z.union([
  //   z.string().min(1, "Invalid avatar URL"),
  //   z.instanceof(File),
  // ]),
});

export type CreateUserForm = z.infer<typeof createUserSchema>;
