/** @jsxImportSource @emotion/react */
"use client";
import { css, SerializedStyles } from "@emotion/react";
import { useState, useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  isLoading: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
  isLoading,
}: PaginationProps) {
  const [totalPaginator, setTotalPaginator] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      setTotalPaginator(window.innerWidth < 600 ? 3 : 8);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div css={paginationContainer}>
      <button
        onClick={() => !isLoading && setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        if (
          pageNumber >= currentPage &&
          pageNumber <= currentPage + totalPaginator
        ) {
          return (
            <button
              key={pageNumber}
              onClick={() => !isLoading && setCurrentPage(pageNumber)}
              disabled={currentPage === pageNumber || isLoading}
            >
              {pageNumber}
            </button>
          );
        }
        return null;
      })}
      {totalPages > currentPage + totalPaginator && (
        <button
          onClick={() => !isLoading && setCurrentPage(currentPage + 1)}
          disabled={isLoading}
        >
          Next
        </button>
      )}
    </div>
  );
}

const paginationContainer: SerializedStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  button {
    padding: 0.5rem 1rem;
    margin: 0 0.2rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #f1f1f1;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: 0.3s ease-in-out;

    &:hover {
      background-color: #e1e1e1;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;
