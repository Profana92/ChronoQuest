"use client";

import { ProfileUser } from "@/types/ProfileUser";
import ProfileCard from "./ProfileCard";
import ProfileUpdate from "./ProfileUpdate";
const ProfileComponent = ({ user, update }: ProfileUser) => {
  console.log(update);
  return (
    <div>
      <ProfileCard user={user} />
      <ProfileUpdate />
    </div>
  );
};

export default ProfileComponent;
