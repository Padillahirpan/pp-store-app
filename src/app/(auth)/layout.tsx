import { DarkmodeToggle } from "@/src/components/commons/darkmode-toggle";
import { Container } from "lucide-react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="absolute top-4 right-4">
        <DarkmodeToggle />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <div className="bg-yellow-500 flex p-2 rounded-md items-center justify-center">
            <Container className="size-6" />
          </div>
          TOKO ABBI
        </div>
        {children}
      </div>
    </div>
  );
}
