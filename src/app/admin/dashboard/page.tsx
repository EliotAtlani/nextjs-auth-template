import { User } from "@prisma/client";
import React from "react";

import { auth } from "../../../../auth";

import { SignOutBtn } from "@/components/buttons/sign-out-btn";

const AdminDashboard = async () => {
  const session = (await auth()) as unknown as User;

  if (session.role != "admin") {
    return <h1> 404 - Not authorized</h1>;
  }
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>
        {" "}
        Welcome {session.firstname} {session.lastname}
      </h2>
      <h3> {session.email}</h3>
      <h4> {session.role}</h4>
      <SignOutBtn />
    </div>
  );
};

export default AdminDashboard;
