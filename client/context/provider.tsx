"use client";
import { SessionProvider } from "next-auth/react";
interface LayoutProps {
  children: React.ReactNode;
}
const Provider = ({ children }: LayoutProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
