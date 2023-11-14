"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileComponent from "@/components/profile";
import { getServerSession } from "next-auth";
const ProfileServerPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <section className="pt-14">
      <h1>Profile Server Side</h1>
      <ProfileComponent user={session?.user} />
    </section>
  );
};

export default ProfileServerPage;
