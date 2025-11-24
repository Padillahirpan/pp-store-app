"use client";

import FormInput from "@/src/components/commons/form-input";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Form } from "@/src/components/ui/form";
import {
  INITIAL_LOGIN_FORM,
  INITIAL_STATE_LOGIN_FORM,
} from "@/src/constants/auth-constant";
import { LoginForm, loginSchemaForm } from "@/src/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { login } from "../actions";
import { Loader2 } from "lucide-react";

export default function Login() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchemaForm),
    defaultValues: INITIAL_LOGIN_FORM,
  });

  const [loginState, loginAction, isPendingLogin] = useActionState(
    login,
    INITIAL_STATE_LOGIN_FORM
  );

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(`this is test login: ${JSON.stringify(data)}`);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      console.log(`key: ${key}, value: ${value}`);
      formData.append(key, value);
    });

    startTransition(() => {
      console.log("Submitting login form...");
      loginAction(formData);
    });
  });

  useEffect(() => {
    if (loginState.status === "error") {
      startTransition(() => {
        loginAction(null);
      });
    }
  }, [loginState]);

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome</CardTitle>
        <CardDescription>Please sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormInput
              form={form}
              name="email"
              label="Email"
              placeholder="Insert your email"
              type="email"
            />
            <FormInput
              form={form}
              name="password"
              label="Password"
              placeholder="**********"
              type="password"
            />
            <Button type="submit" className="w-full mt-4">
              {isPendingLogin ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
