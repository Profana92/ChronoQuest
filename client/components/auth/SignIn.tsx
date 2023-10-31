"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Form from "../global/Form";
import Button from "../global/Button";
import { forgotPasswordWithCredentials } from "@/actions/authActions";
type Props = {
  callbackUrl: string;
};
const SignIn = ({ callbackUrl }: Props) => {
  async function handleCredentialsLogin(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    await signIn("credentials", { email, password, callbackUrl });
  }

  async function handleForgotPassword(formData) {
    const email = formData.get("email");

    const res = await forgotPasswordWithCredentials({ email });
    if (res?.msg) alert(res?.msg);
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
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <Button value="Credentials" />
      </Form>

      {/* Forgot password*/}
      <h3>Forgot password?</h3>
      <Form action={handleForgotPassword}>
        <input type="email" name="email" placeholder="Email" required />
        <Button value="Forgot password" />
      </Form>
      <div>
        <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default SignIn;
