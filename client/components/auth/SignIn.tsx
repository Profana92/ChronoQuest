"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Form from "../global/Form";
import Button from "../global/Button";
import { SiGoogle } from "react-icons/si";
import { forgotPasswordWithCredentials } from "@/actions/authActions";
import HeadingSecondary from "../reusable/HeadingSecondary";
import ParagraphRegular from "../reusable/ParagraphRegular";
type Props = {
  callbackUrl: string;
};
const SignIn = ({ callbackUrl }: Props) => {
  async function handleCredentialsLogin(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    await signIn("credentials", { email, password, callbackUrl: "/game" });
  }

  async function handleForgotPassword(formData) {
    const email = formData.get("email");

    const res = await forgotPasswordWithCredentials({ email });
    if (res?.msg) alert(res?.msg);
  }
  return (
    <div>
      <HeadingSecondary>Sign in:</HeadingSecondary>
      <ParagraphRegular>
        {" "}
        Greetings, Time Traveler. Prepare for a journey through time in our browser-based game. To get started, a brief
        stop at the login page is required. If you're already acquainted with the temporal landscape, sign in.
        Newcomers, create an account to join the ranks.
      </ParagraphRegular>
      {/* Sign in with credentials*/}
      <Form action={handleCredentialsLogin}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <Button value="Credentials" />
      </Form>

      {/* Google login */}
      <div className="inline-block shadow-lg rounded-md bg-gradient-to-br from-[#927CEB] to-[#F4928D] p-[1px] my-5">
        <button
          className="w-10 h-10 cursor-pointer rounded-[5px] text-center bg-Neutral-Dark hover:bg-Tetriary py-2"
          onClick={() => {
            signIn("google", { callbackUrl: "/game" });
          }}
        >
          <SiGoogle className="w-full" size="1.6rem" />
        </button>
      </div>
      {/* Forgot password*/}
      <h3>Forgot password?</h3>
      <Form action={handleForgotPassword}>
        <div className="shadow-lg rounded-md bg-gradient-to-br from-[#927CEB] to-[#F4928D] p-[1px] w-32 my-5">
          <input
            className="w-full cursor-pointer rounded-[5px] text-left bg-Neutral-Dark hover:bg-Tetriary p-2"
            type="email"
            name="email"
            placeholder="Email..."
            required
          />
        </div>
        <Button value="Forgot password" />
      </Form>
      <div>
        <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default SignIn;
