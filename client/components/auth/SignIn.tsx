"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Form from "../global/Form";
import Button from "../global/Button";
type Props = {
  callbackUrl: string;
};
const SignIn = ({ callbackUrl }: Props) => {
  async function handleCredentialsLogin(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    await signIn("credentials", { email, password, callbackUrl });
  }

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
      {/* Sign in with credentials*/}
      <Form action={handleCredentialsLogin}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <Button value="Credentials" />
      </Form>
      <div>
        <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default SignIn;
