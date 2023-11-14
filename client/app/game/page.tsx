"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProtectedComponent from "@/components/ProtectedComponent";
import User from "@/models/userModel";
import { getServerSession } from "next-auth/next";
const ProtectedServerPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  const searchHandler = async () => {
    const role = await User.findOne({ _id: session.user._id });
    return role;
  };
  const role = await searchHandler();
  console.log("role", role);
  return (
    <div>
      <h1>this is a Server Side Protected Page</h1>
      <ProtectedComponent user={session?.user} />
    </div>
  );
};

export default ProtectedServerPage;
