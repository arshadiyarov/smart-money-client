"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/shadcn/dropdown-menu";
import { Button } from "@/shared/ui/shadcn/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";

export const FilterButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button>
          Filter By
          <ChevronDown
            className={cn("transition-all", { "rotate-180": open })}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Filter One</DropdownMenuItem>
        <DropdownMenuItem>Filter Two</DropdownMenuItem>
        <DropdownMenuItem>Filter Three</DropdownMenuItem>
        <DropdownMenuItem>Filter Four</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
