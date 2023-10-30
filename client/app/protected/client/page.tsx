"use client";
import ProtectedComponent from "@/components/ProtectedComponent";
const ProtectedClientPage = () => {
  return (
    <div>
      <h1>this is a Client Side Protected Page</h1>
      <ProtectedComponent />
    </div>
  );
};

export default ProtectedClientPage;
