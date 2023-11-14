"use server";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignOut from "../auth/SignOut";
const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="fixed w-full flex gap-7 h-14 items-center justify-center bg-black/25">
      <Link href="/">Home</Link>
      <Link href="/support">Support</Link>
      <Link href="/leaderboard">Leaderboard</Link>
      <Link href="/authors">Authors</Link>
      <Link href="/donate">Donate</Link>
      {session ? (
        <>
          <Link href="/game">Game</Link>
          <Link href="/profile/server">Profile (server)</Link>
          {session?.user?.role === "admin" ? <Link href="/dashboard">Admin Dashboard</Link> : ""}
          <SignOut />
        </>
      ) : (
        <Link href="/signin">Sign in</Link>
      )}
    </header>
  );
};

export default Header;
