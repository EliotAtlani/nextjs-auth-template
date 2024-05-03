"use client";
/* eslint-disable max-len */
import {
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { ModeToggle } from "@/components/themes/mode-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
const SideBar = () => {
  const path = usePathname();
  console.log(path);
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/admin/dashboard"
              className={cn(
                path == "/admin/dashboard"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
                "flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8"
              )}
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="dashboard/users"
              className={cn(
                path == "/admin/dashboard/users"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
                "flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8"
              )}
            >
              <Users2 className="h-5 w-5" />
              <span className="sr-only">Users</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Users</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className={cn(
                path == "/admin/dashboardf"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
                "flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8"
              )}
            >
              <Package className="h-5 w-5" />
              <span className="sr-only">Products</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Products</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className={cn(
                path == "/admin/dashboardf"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
                "flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8"
              )}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Customers</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Customers</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className={cn(
                path == "/admin/dashboardf"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
                "flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8"
              )}
            >
              <LineChart className="h-5 w-5" />
              <span className="sr-only">Analytics</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Analytics</TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <ModeToggle />
      </nav>
    </aside>
  );
};

export default SideBar;
