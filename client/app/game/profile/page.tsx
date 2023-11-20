"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileComponent from "@/components/profile";
import User from "@/models/userModel";
import { getServerSession } from "next-auth/next";
const PlayerPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  const searchHandler = async () => {
    const role = await User.findOne({ _id: session.user._id });
    return role;
  };
  const role = await searchHandler();
  console.log("role", role);
  return (
    <section className="pt-14">
      <h1>Profile Server Side</h1>
      <ProfileComponent user={session?.user} />
    </section>
  );
};

export default PlayerPage;
