"use client";

import DataTable from "@/src/components/commons/data-table";
import { Button } from "@/src/components/ui/button";
import { Dialog, DialogTrigger } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { HEADER_TABLE_USER } from "@/src/constants/user-constant";
import { createClient } from "@/src/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";

export default function UserManagementPage() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false });

      if (error)
        toast.error("Get User data failed", {
          description: error.message,
        });

      return data;
    },
  });

  const filteredData = useMemo(() => {
    return (users || []).map((user, index) => [
      index + 1,
      user.id,
      user.name,
      user.role,
    ]);
  }, [users]);

  return (
    <div className="w-full ">
      <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
        <h1>User Management</h1>
        <div className="flex gap-2">
          <Input placeholder="Search user..." />
          <Dialog>
            <DialogTrigger className="btn-primary btn" asChild>
              <Button>Create</Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>
      <DataTable
        header={HEADER_TABLE_USER}
        data={filteredData}
        isLoading={isLoading}
      />
    </div>
  );
}
