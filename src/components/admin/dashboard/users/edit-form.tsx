/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { User } from "@prisma/client";
import React, { useState } from "react";

import { EditUserAdmin } from "@/actions/user/patch/edit-user-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SheetClose } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";

const EditForm = ({ user }: { user: User }) => {
  const [select, setSelect] = useState(user.role as string);
  const { toast } = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = {
        email: user.email,
        firstname: e.target["first-name"].value,
        lastname: e.target["last-name"].value,
        role: select,
      };
      const resp = await EditUserAdmin(data);
      if (resp) {
        toast({
          title: "User updated",
        });
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: error.message as string,
      });
    }
  };

  console.log(select);
  return (
    <div className="w-full">
      <Label className="text-2xl font-bold">
        Edit {user.firstname} {user.lastname}?
      </Label>
      <form className="grid gap-4 mt-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>First Name</Label>
            <Input
              id="first-name"
              type="text"
              className="mt-1"
              defaultValue={user.firstname as string}
            />
          </div>
          <div>
            <Label>Last Name</Label>
            <Input
              id="last-name"
              type="text"
              className="mt-1"
              defaultValue={user.lastname as string}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-1">
          <div>
            <Label>Role</Label>
            <Select
              defaultValue={user.role as string}
              value={select}
              onValueChange={(event) => setSelect(event)}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Button className="btn">
            <SheetClose>Save </SheetClose>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
