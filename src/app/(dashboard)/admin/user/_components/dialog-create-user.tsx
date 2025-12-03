import FormInput from "@/src/components/commons/form-input";
import { Button } from "@/src/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Form } from "@/src/components/ui/form";
import {
  INITIAL_CREATE_USER_FORM,
  INITIAL_STATE_CREATE_USER,
  ROLES,
} from "@/src/constants/auth-constant";
import {
  CreateUserForm,
  createUserSchema,
} from "@/src/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createUser } from "../actions";
import FormSelect from "@/src/components/commons/form-select";

export default function DialogCreateUser({ refetch }: { refetch: () => void }) {
  const form = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: INITIAL_CREATE_USER_FORM,
  });

  const [createUserState, createUserAction, isPendingCreateUser] =
    useActionState(createUser, INITIAL_STATE_CREATE_USER);

  const onSubmit = form.handleSubmit((data) => {
    console.log("onSubmit triggered with data:", data);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      createUserAction(formData);
    });
  });

  useEffect(() => {
    if (createUserState.status === "error") {
      toast.error("Create user failed", {
        description: createUserState.errors._form?.[0] || "Please try again.",
      });
    }

    if (createUserState.status === "success") {
      toast.success("Create user success", {
        description: "Create user success",
      });
      form.reset();
      // This line attempts to close a dialog by clicking a button with data-state="open".
      // It might be more robust to use a ref or a state variable to control the dialog's open state.
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [createUserState]);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form {...form}>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>Create a new user</DialogDescription>
        </DialogHeader>
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
            name="name"
            label="Name"
            placeholder="Insert your name"
            type="text"
          />
          <FormSelect form={form} name="role" label="Role" selectItem={ROLES} />
          <FormInput
            form={form}
            name="password"
            label="Password"
            placeholder="**********"
            type="password"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {isPendingCreateUser ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
