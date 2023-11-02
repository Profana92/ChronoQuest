"use server";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignOut from "../auth/SignOut";
const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex gap-7">
      <Link href="/">Home</Link>
      <Link href="/protected/client">Protected (client)</Link>
      <Link href="/protected/server">Protected (server)</Link>

      {session ? (
        <>
          <Link href="/profile/client">Profile (client)</Link>
          <Link href="/profile/server">Profile (server)</Link>
          <Link href="/dashboard">Admin Dashboard</Link>
          <SignOut />
        </>
      ) : (
        <Link href="/signin">Sign in</Link>
      )}
    </header>
  );
};

export default Header;
