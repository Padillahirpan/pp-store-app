import { useState } from "react";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants/datatable-contant";
import useDebounce from "./use-debounce";

export default function useDatatable() {
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [currentLimit, setCurrentLimit] = useState(DEFAULT_LIMIT);
  const [currentSearch, setCurrentSearch] = useState("");
  const debounce = useDebounce();

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleChangeLimit = (limit: number) => {
    setCurrentLimit(limit);
    setCurrentPage(DEFAULT_PAGE);
  };

  const handleChangeSearch = (search: string) => {
    debounce(() => {
      setCurrentSearch(search);
      setCurrentPage(DEFAULT_PAGE);
    }, 500);
  };

  const handleReset = () => {
    setCurrentPage(DEFAULT_PAGE);
    setCurrentLimit(DEFAULT_LIMIT);
    setCurrentSearch("");
  };

  return {
    currentPage,
    currentLimit,
    currentSearch,
    handleChangePage,
    handleChangeLimit,
    handleChangeSearch,
    handleReset,
  };
}
