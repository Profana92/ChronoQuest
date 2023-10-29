"use client";
import { signIn } from "next-auth/react";
type Props = {
  callbackUrl: string;
};
const SignIn = ({ callbackUrl }: Props) => {
  return (
    <div>
      <h2>Sign In With NextAuth</h2>
      <div>
        <button
          onClick={() => {
            signIn("google", { callbackUrl });
          }}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
