"use client";

import ProfileComponent from "@/components/profile";
// import { useSession } from "next-auth/react";
const ProfileClientPage = () => {
  // const { data: session, update } = useSession();
  return (
    <div>
      <h1>Profile Client Side</h1>
      <ProfileComponent  />
    </div>
  );
};

export default ProfileClientPage;
