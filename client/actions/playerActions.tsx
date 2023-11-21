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
        health: { amount: 100, lastUpdatedAt: Date.now() },
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
        ap: { amount: 100, lastUpdatedAt: Date.now() },
        sex: sex,
        gold: 10,
      },
    });
    return { msg: "Player sucessfully created" };
  } catch (error) {
    redirect(`/errors?error=${error?.message}`);
  }
}

export async function updateActionPoints({ intervalPerPoint }) {
  try {
    const session = await getServerSession(authOptions);

    const { amount, lastUpdatedAt } = (await User.findOne({ "character.title": session.user.character.title }))
      .character.ap;
    //if current ap amount >=100 do nothing
    if (amount >= 100) {
      const newAmount = await User.updateOne(
        { _id: session?.user?._id },
        {
          $set: {
            "character.ap.amount": 100,
            "character.ap.lastUpdatedAt": new Date(),
          },
        }
      );
      return;
    }

    //calculate time difference from last update
    const timeDifference = +new Date() - lastUpdatedAt;
    //calculate action points to add
    const pointsToAdd = timeDifference / intervalPerPoint;
    //calculate pointstoUpdate, if amount + points>100, then return 100 as it is max ap, if not return actual value.
    const pointsToUpdate = amount + pointsToAdd > 100 ? 100 : Math.round(amount + pointsToAdd);

    if (timeDifference >= intervalPerPoint && amount <= 100) {
      const newAmount = await User.updateOne(
        { _id: session?.user?._id },
        {
          $set: {
            "character.ap.amount": pointsToUpdate,
            "character.ap.lastUpdatedAt": new Date(),
          },
        }
      );
    }

    return { msg: "Player AP updated" };
  } catch (error) {
    redirect(`/errors?error=${error?.message}`);
  }
}

export async function updateHealthPoints({ intervalPerPoint = 60000, valueToRecover = 0 }) {
  console.log("health points updated by:", valueToRecover);
  try {
    const session = await getServerSession(authOptions);
    const { amount, lastUpdatedAt } = (await User.findOne({ "character.title": session.user.character.title }))
      .character.health;

    // if current health amount >=100 do nothing
    if (amount > 100) {
      const newAmount = await User.updateOne(
        { _id: session?.user?._id },
        {
          $set: {
            "character.health.amount": 100,
            "character.health.lastUpdatedAt": new Date(),
          },
        }
      );
      return;
    }
    if (amount + valueToRecover < 0) {
      const newAmount = await User.updateOne(
        { _id: session?.user?._id },
        {
          $set: {
            "character.health.amount": 0,
            "character.health.lastUpdatedAt": new Date(),
          },
        }
      );
      return;
    }

    //calculate time difference from last update
    const timeDifference = +new Date() - lastUpdatedAt;
    //calculate action points to add
    const pointsToAdd = timeDifference / intervalPerPoint + valueToRecover;
    //calculate pointstoUpdate, if amount + points>100, then return 100 as it is max ap, if not return actual value.
    const pointsToUpdate = amount + pointsToAdd > 100 ? 100 : Math.round(amount + pointsToAdd);

    if (amount <= 100) {
      const newAmount = await User.updateOne(
        { _id: session?.user?._id },
        {
          $set: {
            "character.health.amount": pointsToUpdate,
            "character.health.lastUpdatedAt": new Date(),
          },
        }
      );
    }

    return { msg: "Player Health updated" };
  } catch (error) {
    redirect(`/errors?error=${error?.message}`);
  }
}
