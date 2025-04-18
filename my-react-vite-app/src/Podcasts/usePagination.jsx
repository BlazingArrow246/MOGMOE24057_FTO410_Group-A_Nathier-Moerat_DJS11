import { useState } from "react";

export default function usePagination(items, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedItems = items.slice(0, endIndex);

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const hasMore = paginatedItems.length < items.length;

  return { paginatedItems, loadMore, hasMore };
}
