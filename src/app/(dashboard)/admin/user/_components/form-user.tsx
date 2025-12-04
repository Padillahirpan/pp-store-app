import FormImage from "@/src/components/commons/form-image";
import FormInput from "@/src/components/commons/form-input";
import FormSelect from "@/src/components/commons/form-select";
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
import { ROLES } from "@/src/constants/auth-constant";
import { PreviewImage } from "@/src/types/general";
import { Loader2 } from "lucide-react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export default function FormUser<T extends FieldValues>({
  form,
  onSubmit,
  isLoading,
  type,
  preview,
  setPreview,
}: {
  form: UseFormReturn<T>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  type: "create" | "update";
  preview?: PreviewImage;
  setPreview: (preview: PreviewImage) => void;
}) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form {...form}>
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? "Create" : "Update"} User
          </DialogTitle>
          <DialogDescription>
            {type === "create"
              ? "Create a new user"
              : "Update user information"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          {type === "create" && (
            <FormInput
              form={form}
              name={"email" as Path<T>}
              label="Email"
              placeholder="Insert your email"
              type="email"
            />
          )}
          <FormInput
            form={form}
            name={"name" as Path<T>}
            label="Name"
            placeholder="Insert your name"
            type="text"
          />
          <FormImage
            form={form}
            name={"avatar_url" as Path<T>}
            label="Avatar"
            preview={preview}
            setPreview={setPreview}
          />
          <FormSelect
            form={form}
            name={"role" as Path<T>}
            label="Role"
            selectItem={ROLES}
          />
          {type === "create" && (
            <FormInput
              form={form}
              name={"password" as Path<T>}
              label="Password"
              placeholder="**********"
              type="password"
            />
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : type === "create" ? (
                "Create"
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
