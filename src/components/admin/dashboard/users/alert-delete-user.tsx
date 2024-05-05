import { User } from "@prisma/client";
import React from "react";

import { deleteUser } from "@/actions/user/delete/deleteUser";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

const AlertDeleteUser = ({ user }: { user: User }) => {
  const { toast } = useToast();

  const handleDeleteUser = async () => {
    try {
      // delete user
      await deleteUser(user.email);
      toast({
        title: "User deleted successfully",
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
        <AlertDialogDescription className="text-primary font-bold">
          Delete {user.firstname} {user.lastname} account?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleDeleteUser}>
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
};

export default AlertDeleteUser;
