"use client";
import { useSession } from "next-auth/react";
const ProtectedClientPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1>this is a Client Side Protected Page</h1>
      <p>You are logged in as {session?.user?.name}</p>
    </div>
  );
};

export default ProtectedClientPage;
