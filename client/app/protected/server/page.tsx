"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProtectedComponent from "@/components/ProtectedComponent";
import { getServerSession } from "next-auth/next";
const ProtectedServerPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>this is a Server Side Protected Page</h1>
      <ProtectedComponent user={session?.user} />
    </div>
  );
};

export default ProtectedServerPage;
