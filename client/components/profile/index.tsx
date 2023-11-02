"use client";

import { ProfileUser } from "@/types/ProfileUser";
import ProfileCard from "./ProfileCard";
import ProfileUpdate from "./ProfileUpdate";
import { useSession } from "next-auth/react";
import ChangePassword from "./ChangePassword";
const ProfileComponent = ({ user }: ProfileUser) => {
  const { data: session, update } = useSession();
  return (
    <div>
      <ProfileCard user={session?.user || user} />
      <ProfileUpdate update={update} />
      {(session?.user?.provider === "credentials" || user?.provider === "credentials") && <ChangePassword />}
    </div>
  );
};

export default ProfileComponent;
