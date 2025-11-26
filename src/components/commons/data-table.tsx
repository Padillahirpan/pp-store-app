import { ReactNode } from "react";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import PaginationDataTable from "./pagination-data-table";

export default function DataTable({
  header,
  data,
  isLoading,
  totalPages,
  currentPage,
  currentLimit,
  onPageChange,
  onLimitChange,
}: {
  header: string[];
  data?: (string | ReactNode)[][];
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  currentLimit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}) {
  return (
    <div className="w-full flex flex-col gap-4">
      <Card className="p-0">
        <Table className="w-full rounded-lg overflow-hidden">
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              {header.map((head) => (
                <TableHead key={`th-${head}`} className="px-6 py-3">
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((row, rowIndex) => (
              <TableRow key={`tr-${rowIndex}`} className="hover:bg-accent">
                {row.map((cell, cellIndex) => (
                  <TableCell
                    key={`td-${rowIndex}-${cellIndex}`}
                    className="px-6 py-4"
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {data?.length === 0 && !isLoading && (
              <TableRow>
                <TableCell colSpan={header.length} className="h-24 text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={header.length} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      <div className="flex items-center justify-between">
        <div></div>
        <div className="flex justify-end">
          <PaginationDataTable
            totalPages={totalPages}
            currentPage={currentPage}
            onChangePage={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
