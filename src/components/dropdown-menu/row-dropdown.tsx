import { User } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";

import EditForm from "../admin/dashboard/users/edit-form";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
const RowDropdown = ({ user }: { user: User }) => {
  return (
    <div>
      <Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <SheetTrigger className="w-full">
              <DropdownMenuItem className="cursor-pointer">
                Edit
              </DropdownMenuItem>
            </SheetTrigger>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <SheetContent>
          <EditForm user={user as User} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default RowDropdown;
