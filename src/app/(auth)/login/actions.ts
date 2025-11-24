"use server";

import { INITIAL_STATE_LOGIN_FORM } from "@/src/constants/auth-constant";
import { createClient } from "@/src/lib/supabase/server";
import { AuthFormState } from "@/src/types/auth";
import { loginSchemaForm } from "@/src/validations/auth-validation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  prevState: AuthFormState,
  formData: FormData | null
) {
  console.log(`FIRST INITIAL STATE: ${JSON.stringify(prevState)}`);

  if (!formData) {
    return INITIAL_STATE_LOGIN_FORM;
  }

  console.log(`Supabase FORM DATA: ${JSON.stringify(formData)}`);

  const validatedFields = loginSchemaForm.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
        _form: ["Invalid form submission."],
      },
    };
  }

  const supabase = await createClient();

  const {
    error,
    data: { user },
    // } = await supabase.auth.signInWithPassword(validatedFields.data);
  } = await supabase.auth.signInWithPassword({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  });

  console.log(`Supabase login error: ${JSON.stringify(error)}`);

  if (error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  if (!profile) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: ["Profile not found."],
      },
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("profile", JSON.stringify(profile), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  revalidatePath("/", "layout");
  redirect("/");
}
