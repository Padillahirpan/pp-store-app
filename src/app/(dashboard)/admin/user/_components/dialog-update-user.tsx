import { INITIAL_STATE_UPDATE_USER } from "@/src/constants/auth-constant";
import {
  UpdateUserForm,
  updateUserSchema,
} from "@/src/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateUser } from "../actions";
import { startTransition, useActionState, useEffect, useState } from "react";
import { PreviewImage } from "@/src/types/general";
import { toast } from "sonner";
import FormUser from "./form-user";
import { Profile } from "@/src/types/auth";
import { Dialog } from "@/src/components/ui/dialog";

export default function DialogUpdateUser({
  refetch,
  currentData,
  open,
  handleChangeAction,
}: {
  refetch: () => void;
  currentData?: Profile;
  open?: boolean;
  handleChangeAction?: (open: boolean) => void;
}) {
  const form = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserSchema),
  });

  const [updateUserState, updateUserAction, isPendingUpdateUser] =
    useActionState(updateUser, INITIAL_STATE_UPDATE_USER);

  const [preview, setPreview] = useState<PreviewImage | undefined>(null);

  const onSubmit = form.handleSubmit((data) => {
    if (preview && preview.file && preview.file.size > 1024 * 1024) {
      toast.error("File size too large", {
        description: "The avatar image must be less than 1MB.",
      });
      return;
    }

    const formData = new FormData();
    if (currentData?.avatar_url !== data.avatar_url) {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(
          key,
          key === "avatar_url" ? (preview!.file ?? "") : value,
        );
      });
      formData.append("old_avatar_url", currentData?.avatar_url ?? "");
    } else {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }
    formData.append("id", currentData?.id ?? "");

    startTransition(() => {
      updateUserAction(formData);
    });
  });

  useEffect(() => {
    if (updateUserState.status === "error") {
      toast.error("Update user failed", {
        description: updateUserState.errors._form?.[0] || "Please try again.",
      });
    }

    if (updateUserState.status === "success") {
      toast.success("Update user success");
      handleChangeAction?.(false);
      form.reset();
      refetch();
    }
  }, [updateUserState]);

  useEffect(() => {
    if (currentData) {
      form.setValue("name", currentData.name as string);
      form.setValue("role", currentData.role as string);
      form.setValue("avatar_url", currentData.avatar_url as string);

      setTimeout(() => {
        setPreview({
          file: new File([], currentData.avatar_url as string),
          displayUrl: currentData.avatar_url as string,
        });
      }, 10);
    }
  }, [currentData]);

  return (
    <Dialog open={open} onOpenChange={handleChangeAction}>
      <FormUser
        form={form}
        isLoading={isPendingUpdateUser}
        type="update"
        preview={preview}
        setPreview={setPreview}
        onSubmit={onSubmit}
      />
    </Dialog>
  );
}
