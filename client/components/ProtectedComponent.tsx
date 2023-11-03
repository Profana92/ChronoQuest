"use client";
import { useSession } from "next-auth/react";
type Props = {
  user?: {
    createdAt: Date;
    email: string;
    image: string;
    name: string;
    provider: string;
    role: "admin" | "user";
    updatedAt: Date;
    __v: number;
    _id: string;
  };
};
const ProtectedComponent = ({ user }: Props) => {
  console.log(user);
  const { data: session } = useSession();
  return <p>You are logged in as {session?.user?.name || user?.name}</p>;
};

export default ProtectedComponent;
