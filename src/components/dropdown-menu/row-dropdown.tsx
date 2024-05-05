import { User } from "@prisma/client";
import { MoreHorizontal, Pencil, UserMinus } from "lucide-react";

import AlertDeleteUser from "../admin/dashboard/users/alert-delete-user";
import EditForm from "../admin/dashboard/users/edit-form";
import { Button } from "../ui/button";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
        <AlertDialog>
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
                  <Pencil size={16} className="mr-2" /> Edit
                </DropdownMenuItem>
              </SheetTrigger>
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <AlertDialogTrigger className="w-full flex cursor-pointer">
                  <UserMinus size={16} className="mr-2" /> Delete
                </AlertDialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <SheetContent>
            <EditForm user={user as User} />
          </SheetContent>
          <AlertDialogContent>
            <AlertDeleteUser user={user as User} />
          </AlertDialogContent>
        </AlertDialog>
      </Sheet>
    </div>
  );
};

export default RowDropdown;
