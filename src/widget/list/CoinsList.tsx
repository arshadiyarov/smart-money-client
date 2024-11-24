"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/shadcn/table";
import { Button } from "@/shared/ui/shadcn/button";
import { ChartCandlestick, RefreshCwIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/ui/shadcn/tooltip";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { coinService } from "@/entities/coin/coin.service";
import { Loader } from "@/shared/ui/Loader";
import { cn } from "@/shared/lib/utils";

export const CoinsList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 0);

  const {
    data: coins,
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["coins", currentPage],
    queryFn: () => coinService.getCoins(currentPage, 1, undefined),
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-end">Price</TableHead>
          <TableHead className="text-end">Change</TableHead>
          <TableHead className="text-end">Volume</TableHead>
          <TableHead className="text-end">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={5} className="h-[75px]">
              <div className="flex justify-center items-center h-full">
                <Loader className="w-12 h-12 animate-spin" />
              </div>
            </TableCell>
          </TableRow>
        ) : isError ? (
          <TableRow>
            <TableCell colSpan={5} className="h-[75px]">
              <div className="flex flex-col justify-center items-center h-full">
                <span className="text-xl font-medium">
                  Something went wrong
                </span>
                <Button
                  variant="link"
                  className="text-sm group"
                  onClick={() => refetch()}
                >
                  Try again{" "}
                  <RefreshCwIcon className="group-hover:animate-spin" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          coins.content.map((coin) => (
            <TableRow
              key={coin.id}
              className="cursor-pointer"
              onClick={() => router.push(`/list/${coin.id}`)}
            >
              <TableCell>
                <span className="font-semibold text-lg">
                  {coin.symbol}{" "}
                  <span className="text-base font-normal">{coin.name}</span>
                </span>
              </TableCell>
              <TableCell className="text-end">
                <span className="font-semibold text-lg">
                  ${coin.lastPrice.toLocaleString()}
                </span>
              </TableCell>
              <TableCell className="text-end">
                <span
                  className={cn("font-semibold text-lg", {
                    "text-green-500": coin.priceChangePercent > 0,
                    "text-red-500": coin.priceChangePercent < 0,
                  })}
                >
                  {coin.priceChangePercent > 0 && "+"}
                  {coin.priceChangePercent}%
                </span>
              </TableCell>
              <TableCell className="text-end">
                <span className="text-lg font-medium">
                  ${coin.volume.toLocaleString()}
                </span>
              </TableCell>
              <TableCell className="text-end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="outline" className="text-sm">
                      <ChartCandlestick />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Trade</span>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
