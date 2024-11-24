"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/shared/ui/shadcn/table";
import { Loader } from "@/shared/ui/Loader";
import { cn } from "@/shared/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { coinService } from "@/entities/coin/coin.service";
import { Button } from "@/shared/ui/shadcn/button";
import { RefreshCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const PopularList = () => {
  const router = useRouter();

  const {
    data: popularCoins,
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["popularCoins"],
    queryFn: () => coinService.getPopularCoins(),
  });

  return (
    <div className="border-2 border-dark-blue rounded-3xl py-8 px-7">
      <Table>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={3} className="h-[300px]">
                <div className="flex justify-center items-center h-full">
                  <Loader className="w-12 h-12 animate-spin" />
                </div>
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={3} className="h-[300px]">
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
            popularCoins?.content.map((coin) => (
              <TableRow
                key={coin.id}
                className="cursor-pointer"
                onClick={() => router.push(`/list/${coin.id}`)}
              >
                <TableCell className="py-5">
                  <span className="font-semibold text-lg">
                    {coin.symbol}{" "}
                    <span className="text-base font-normal">{coin.name}</span>
                  </span>
                </TableCell>
                <TableCell className="text-right py-5">
                  <span className="font-semibold text-lg">
                    ${coin.lastPrice.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell className="text-right py-5">
                  <span
                    className={cn("font-semibold text-lg", {
                      "text-green-500": coin.priceChangePercent > 0,
                      "text-red-500": coin.priceChangePercent < 0,
                    })}
                  >
                    {coin.priceChangePercent}%
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
