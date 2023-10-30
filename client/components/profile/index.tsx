"use client";

import { ProfileUser } from "@/types/ProfileUser";
import ProfileCard from "./ProfileCard";
import ProfileUpdate from "./ProfileUpdate";
import { useSession } from "next-auth/react";
const ProfileComponent = ({ user }: ProfileUser) => {
  const { data: session, update } = useSession();
  return (
    <div>
      <ProfileCard user={session?.user || user} />
      <ProfileUpdate update={update} />
    </div>
  );
};

export default ProfileComponent;
