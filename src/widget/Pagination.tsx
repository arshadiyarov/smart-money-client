"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/shadcn/pagination";
import { useQuery } from "@tanstack/react-query";
import { coinService } from "@/entities/coin/coin.service";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const MyPagination = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let currentPage = Number(searchParams.get("page") || 0);
  const { replace } = useRouter();

  const { data: coins } = useQuery({
    queryKey: ["coins", currentPage],
    queryFn: () => coinService.getCoins(currentPage, 1, ""),
  });

  const totalPages = Array.from(
    { length: coins?.totalPages ?? 1 },
    (_, i) => i + 1,
  );

  const handlePageChange = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const handleNextPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(++currentPage));
    replace(`${pathname}?${params.toString()}`);
  };

  const handlePrevPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(--currentPage));
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevPage}
            disabled={coins?.first}
          />
        </PaginationItem>
        {totalPages.map((page, i) => (
          <PaginationItem key={i} onClick={() => handlePageChange(page - 1)}>
            <PaginationLink isActive={page === currentPage + 1}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPages.length > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext onClick={handleNextPage} disabled={coins?.last} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
