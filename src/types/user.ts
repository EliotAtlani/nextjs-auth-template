import { Session } from "next-auth";

export type User = Session & {
  name: string;
  email: string;
};

export type UserCredentials = {
  email: string;
  password: string;
};
