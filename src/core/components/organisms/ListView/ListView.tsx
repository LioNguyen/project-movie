import "./ListView.styles.scss";

import { memo } from "react";
import { FaList, FaThList } from "react-icons/fa";
import { IoGrid, IoGridOutline } from "react-icons/io5";
import clsx from "clsx";
import { isEqual } from "lodash";

import { Card } from "@/core/components";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/core/components/atoms/Pagination/pagination";

export interface ListViewProps {
  title: string;
  data: any[];
  viewType?: "grid" | "list";
  onViewChange?: (type: "grid" | "list") => void;
  onItemClick?: (id: string) => void;
  onGenreClick?: (genreId: number, genreName: string) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const view = [
  {
    key: "grid",
    title: "Grid",
    icon: <IoGridOutline color="white" />,
    iconActive: <IoGrid color="white" />,
  },
  {
    key: "list",
    title: "List",
    icon: <FaList color="white" />,
    iconActive: <FaThList color="white" />,
  },
];
type ViewType = "grid" | "list";

export const ListView = memo(
  ({
    title,
    data,
    viewType = "grid",
    onViewChange,
    onItemClick,
    onGenreClick,
    currentPage = 1,
    totalPages = 1,
    onPageChange,
  }: ListViewProps) => {
    const handleViewChange = (type: ViewType) => {
      onViewChange?.(type);
    };

    const handleMovieClick = (id: string) => {
      onItemClick?.(id);
    };

    const handlePageClick = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        onPageChange?.(page);
      }
    };

    const renderPaginationItems = () => {
      const items = [];
      const maxVisiblePages = 5;

      if (totalPages <= maxVisiblePages) {
        // Show all pages if total is less than max visible
        for (let i = 1; i <= totalPages; i++) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink
                isActive={currentPage === i}
                onClick={() => handlePageClick(i)}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      } else {
        // Always show first page
        items.push(
          <PaginationItem key={1}>
            <PaginationLink
              isActive={currentPage === 1}
              onClick={() => handlePageClick(1)}
            >
              1
            </PaginationLink>
          </PaginationItem>
        );

        // Show ellipsis if current page is far from start
        if (currentPage > 3) {
          items.push(
            <PaginationItem key="ellipsis-start">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }

        // Show pages around current page
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink
                isActive={currentPage === i}
                onClick={() => handlePageClick(i)}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }

        // Show ellipsis if current page is far from end
        if (currentPage < totalPages - 2) {
          items.push(
            <PaginationItem key="ellipsis-end">
              <PaginationEllipsis />
            </PaginationItem>
          );
        }

        // Always show last page
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              isActive={currentPage === totalPages}
              onClick={() => handlePageClick(totalPages)}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }

      return items;
    };

    if (!data.length) {
      return null;
    }

    return (
      <div className={clsx("list-view")}>
        <div className="list-view__header">
          <h3 className="title">{title}</h3>

          <div className="button-wrapper">
            <div className="view-type-box">
              {view.map((item) => (
                <div
                  className={clsx("item", item.key === viewType && "active")}
                  key={item.key}
                  onClick={() => handleViewChange(item.key as ViewType)}
                >
                  {item.key === viewType ? item.iconActive : item.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={clsx("list-view__content", viewType)}>
          {data.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              imagePath={item.poster_path}
              title={item.title}
              vote={item.vote_average}
              overview={item.overview}
              genres={item.genres}
              genreIds={item.genre_ids}
              onClick={() => handleMovieClick(item.id)}
              onGenreClick={onGenreClick}
            />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="list-view__pagination">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageClick(currentPage - 1)}
                    aria-disabled={currentPage === 1}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50 w-fit"
                        : "w-fit"
                    }
                  />
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageClick(currentPage + 1)}
                    aria-disabled={currentPage === totalPages}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50 w-fit"
                        : "w-fit"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    );
  },
  isEqual
);
