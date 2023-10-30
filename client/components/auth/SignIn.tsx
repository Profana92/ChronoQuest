"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
type Props = {
  callbackUrl: string;
};
const SignIn = ({ callbackUrl }: Props) => {
  return (
    <div>
      <h2>Sign In With NextAuth</h2>
      {/* Google login */}
      <div>
        <button
          onClick={() => {
            signIn("google", { callbackUrl });
          }}
        >
          Continue with Google
        </button>
      </div>
      <div>
        <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default SignIn;
