"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/shared/ui/shadcn/button";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";

const links = [
  {
    id: 0,
    text: "Homepage",
    href: "/",
    icon: "/assets/icons/home.svg",
  },
  {
    id: 1,
    text: "All Coins",
    href: "/list",
    icon: "/assets/icons/coins.svg",
  },
  {
    id: 2,
    text: "History",
    href: "/history",
    icon: "/assets/icons/history.svg",
  },
  {
    id: 3,
    text: "About",
    href: "/about",
    icon: "/assets/icons/info.svg",
  },
  {
    id: 4,
    text: "Settings",
    href: "/settings",
    icon: "/assets/icons/settings.svg",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-neutral-200 flex flex-col gap-6 rounded-3xl py-7 pl-4 pr-0 w-80">
      <h3 className="text-xl uppercase font-semibold ml-4">Menu</h3>
      <div className="flex flex-col items-start gap-3">
        {links.map((link) => (
          <Button
            variant="ghost"
            key={link.id}
            asChild
            className={cn(
              "w-full rounded-xl rounded-r-none justify-start h-16",
              {
                "bg-white": link.href === pathname,
              },
            )}
          >
            <Link
              href={link.href}
              className="flex items-center gap-3 font-semibold"
            >
              <Image src={link.icon} alt={link.icon} width={24} height={24} />
              {link.text}
            </Link>
          </Button>
        ))}
      </div>
    </aside>
  );
};
