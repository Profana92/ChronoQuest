"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import User from "@/models/userModel";
import { redirect } from "next/navigation";
const BASE_URL = process.env.NEXTAUTH_URL;

export async function addNewCharacter({ name, sex }) {
  try {
    const duplicate = await User.findOne({ "character.title": name });
    if (duplicate) throw new Error("Character name already taken, please try again.");
    const session = await getServerSession(authOptions);
    const user = await User.findByIdAndUpdate(session?.user?._id, {
      character: {
        title: name,
        health: 100,
        class: "none",
        companion: "none",
        level: 1,
        xp: 0,
        str: 5,
        dex: 5,
        int: 5,
        cha: 5,
        spd: 5,
        acc: 5,
        ap: 100,
        sex: sex,
      },
    });
    return { msg: "Player sucessfully created" };
  } catch (error) {
    redirect(`/errors?error=${error?.message}`);
  }
}
