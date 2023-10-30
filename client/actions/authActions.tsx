"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import User from "@/models/userModel";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "@/utils/token";
import sendEmail from "@/utils/sendEmail";

const BASE_URL = process.env.NEXTAUTH_URL;

export async function updateUser({ name, image }) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorization!");

  try {
    const user = await User.findByIdAndUpdate(session?.user?._id, { name, image }, { new: true }).select("-password");
    if (!user) throw new Error("Email does not exist!");
    return { msg: "Updated Profile Successfully" };
  } catch (error) {
    redirect(`/errors?error=${error?.message}`);
  }
}

export async function signUpWithCredentials(data) {
  try {
    const user = await User.findOne({ email: data.email });
    if (user) throw new Error("Email already exists");
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }
    const token = generateToken({ user: data });
    await sendEmail({
      to: data.email,
      url: `${BASE_URL}/verify?token=${token}`,
      text: "VERIFY EMAIL",
    });
    return {
      msg: "Sign Up Successful. Check your email to complete the registration.",
    };
  } catch (error) {
    redirect(`/errors?error=${error?.message}`);
  }
}
export async function verifyWithCredentials(token) {
  try {
    const { user } = verifyToken(token);
    const userExist = await User.findOne({ email: user.email });
    if (userExist) return { msg: "Verified sucessfully. Your journey starts here." };

    const newUser = new User(user);
    await newUser.save();

    return {
      msg: "Verified sucessfully. Your journey starts here.",
    };
  } catch (error) {
    redirect(`/errors?error=${error?.message}`);
  }
}
