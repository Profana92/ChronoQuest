"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import User from "@/models/userModel";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

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
    if (user) throw new Error("Email already exist");
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }
  
    return { msg: "Sign Up Successful. Check your email to complete the registration." };
  } catch (error) {
    redirect(`/errors?error=${error?.message}`);
  }
}
