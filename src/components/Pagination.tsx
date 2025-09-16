import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationCell } from "./PaginationCell";

type Props = {
  totalPages: number;
};

export function Pagination({ totalPages }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSearchParamsPage = Number(searchParams.get("page"));

  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    function generatePages() {
      const pagesArray: number[] = [];
      for (let i = 1; i <= totalPages; i++) {
        pagesArray.push(i);
      }

      setPages(pagesArray);
    }
    generatePages();

    searchParams.set("page", searchParams.get("page") || "1"); //initialize the page nr.
    setSearchParams(searchParams);
  }, [totalPages, searchParams, setSearchParams]);

  function handlePageChange(newPage: number) {
    // const paramsInstance = new URLSearchParams()

    if (!searchParams.get("page")) {
      searchParams.append("page", "1");
    }
    searchParams.set("page", newPage.toString());

    setSearchParams(searchParams);
  }

  function handleNavigation(direction: "left" | "right") {
    if (direction === "left") {
      const newPageValue =
        currentSearchParamsPage > 1 //check to not navigate less than 1
          ? currentSearchParamsPage - 1
          : 1;
      searchParams.set("page", newPageValue.toString());
    }
    if (direction === "right") {
      const newPageValue =
        currentSearchParamsPage < totalPages //check to not increase more than all pages available
          ? currentSearchParamsPage + 1
          : currentSearchParamsPage;
      searchParams.set("page", newPageValue.toString());
    }

    setSearchParams(searchParams);
  }
  return (
    <div>
      <input
        type="number"
        placeholder="Go to page..."
        className="border w-[121px] px-2"
        onChange={(e) => {
          const pageNumber = Number(e.target.value);
          if (pageNumber >= 1 && pageNumber <= totalPages) {
            handlePageChange(pageNumber);
          }
        }}
      />
      <div className="flex  overflow-x-hidden">
        <PaginationCell
          size="lg"
          disabled={currentSearchParamsPage === 1}
          onClick={() => handleNavigation("left")}
          isCurrentPage={false}
        >
          <ChevronLeft />
        </PaginationCell>

        {pages.slice(0, 2).map((page) => {
          return (
            <PaginationCell
              size="lg"
              key={page}
              onClick={() => handlePageChange(page)}
              isCurrentPage={page === Number(searchParams.get("page"))}
            >
              {page}
            </PaginationCell>
          );
        })}
        <PaginationCell size="lg" isCurrentPage={false}>
          ...
        </PaginationCell>
        {!pages.slice(0, 2).includes(currentSearchParamsPage) &&
          !pages
            .slice(totalPages - 2, totalPages)
            .includes(currentSearchParamsPage) && (
            <>
              <PaginationCell
                size="lg"
                isCurrentPage={
                  currentSearchParamsPage === Number(searchParams.get("page"))
                }
              >
                {currentSearchParamsPage}
              </PaginationCell>

              <PaginationCell isCurrentPage={false} size="lg">
                ...
              </PaginationCell>
            </>
          )}
        {pages.slice(totalPages - 2, totalPages).map((page) => {
          return (
            <PaginationCell
              size="lg"
              key={page}
              onClick={() => handlePageChange(page)}
              isCurrentPage={page === Number(searchParams.get("page"))}
            >
              <p>{page}</p>
            </PaginationCell>
          );
        })}

        <PaginationCell
          size="lg"
          disabled={currentSearchParamsPage === totalPages}
          onClick={() => handleNavigation("right")}
          isCurrentPage={false}
        >
          <ChevronRight />
        </PaginationCell>
      </div>
    </div>
  );
}
