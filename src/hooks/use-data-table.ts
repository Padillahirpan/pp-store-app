import { useState } from "react";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants/datatable-contant";

export default function useDatatable() {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [currentLimit, setCurrentLimit] = useState(DEFAULT_LIMIT);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleChangeLimit = (limit: number) => {
    setCurrentLimit(limit);
    setCurrentPage(DEFAULT_PAGE);
  };

  return { currentPage, currentLimit, handleChangePage, handleChangeLimit };
}
