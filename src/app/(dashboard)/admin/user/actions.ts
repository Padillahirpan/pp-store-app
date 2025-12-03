"use server";

import { createClient } from "@/src/lib/supabase/server";
import { AuthFormState } from "@/src/types/auth";
import { createUserSchema } from "@/src/validations/auth-validation";

export async function createUser(prevState: AuthFormState, formData: FormData) {
  const validatedFields = createUserSchema.safeParse({
    email: formData?.get("email")?.toString(),
    password: formData?.get("password")?.toString(),
    name: formData?.get("name")?.toString(),
    role: formData?.get("role")?.toString(),
    // avatar_url: formData?.get("avatar_url")?.toString(),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
        _form: [],
      },
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    options: {
      data: {
        name: validatedFields.data.name,
        role: validatedFields.data.role,
        // avatar_url: validatedFields.data.avatar_url,
      },
    },
  });

  if (error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }

  return {
    status: "success",
    errors: {
      _form: [],
    },
  };
}
