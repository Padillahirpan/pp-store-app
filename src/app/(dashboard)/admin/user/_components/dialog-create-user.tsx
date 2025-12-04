import {
  INITIAL_CREATE_USER_FORM,
  INITIAL_STATE_CREATE_USER,
} from "@/src/constants/auth-constant";
import {
  CreateUserForm,
  createUserSchema,
} from "@/src/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createUser } from "../actions";
import { PreviewImage } from "@/src/types/general";
import FormUser from "./form-user";

export default function DialogCreateUser({ refetch }: { refetch: () => void }) {
  const form = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: INITIAL_CREATE_USER_FORM,
  });

  const [createUserState, createUserAction, isPendingCreateUser] =
    useActionState(createUser, INITIAL_STATE_CREATE_USER);

  const [preview, setPreview] = useState<PreviewImage | undefined>(undefined);

  const onSubmit = form.handleSubmit((data) => {
    if (preview && preview.file && preview.file.size > 1024 * 1024) {
      toast.error("File size too large", {
        description: "The avatar image must be less than 1MB.",
      });
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(
        key,
        key === "avatar_url" ? (preview!.file ?? "") : value,
      );
    });

    startTransition(() => {
      createUserAction(formData);
    });
  });

  function resetPreview() {
    setPreview(undefined);
  }

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
      // resetPreview();
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
      refetch();
    }
  }, [createUserState]);

  return (
    <FormUser
      form={form}
      isLoading={isPendingCreateUser}
      type="create"
      preview={preview}
      setPreview={setPreview}
      onSubmit={onSubmit}
    />
  );
}
