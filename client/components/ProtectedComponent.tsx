"use client";
import { useSession } from "next-auth/react";
const ProtectedComponent = ({ user }) => {
  const { data: session } = useSession();
  return <p>You are logged in as {session?.user?.name || user?.name}</p>;
};

export default ProtectedComponent;
