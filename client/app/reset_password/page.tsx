import ResetPasswordComponent from "@/components/auth/ResetPassword";
import React from "react";

const ResetPasswordPage = ({ searchParams: { token } }) => {
  console.log("🚀 ~ file: page.tsx:5 ~ ResetPasswordPage ~ props:", token);
  return <ResetPasswordComponent token={token} />;
};

export default ResetPasswordPage;
