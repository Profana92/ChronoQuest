"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import User from "@/models/userModel";
import { redirect } from "next/navigation";
const BASE_URL = process.env.NEXTAUTH_URL;

const levelTable = [
  0, 100, 200, 400, 800, 1500, 2600, 4200, 6400, 9300, 13000, 17600, 23200, 29900, 37800, 47000, 57600, 69700, 83400,
  98800, 116000, 135100, 156200, 179400, 204800, 232500, 262600, 295200, 330400, 368300, 409000, 452600, 499200, 548900,
  601800, 658000, 717600, 780700, 847400, 917800, 992000, 1070100, 1152200, 1238400, 1328800, 1423500, 1522600, 1626200,
  1734400, 1847300, 1965000, 2087600, 2215200, 2347900, 2485800, 2629000, 2777600, 2931700, 3091400, 3256800, 3428000,
  3605100, 3788200, 3977400, 4172800, 4374500, 4582600, 4797200, 5018400, 5246300, 5481000, 5722600, 5971200, 6226900,
  6489800, 6760000, 7037600, 7322700, 7615400, 7915800, 8224000, 8540100, 8864200, 9196400, 9536800, 9885500, 10242600,
  10608200, 10982400, 11365300, 11757000, 12157600, 12567200, 12985900, 13413800, 13851000, 14297600, 14753700,
  15219400, 15694800,
];

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

export async function updateXpAndLevel({ expirienceGain = 0 }) {
  try {
    const session = await getServerSession(authOptions);
    const expiriencePoints = (await User.findOne({ "character.title": session.user.character.title })).character.xp;
    if (expiriencePoints + expirienceGain <= 0) {
      const newAmount = await User.updateOne(
        { _id: session?.user?._id },
        {
          $set: {
            "character.xp": 0,
            "character.level": 1,
          },
        }
      );
      return;
    }
    const calculatedLevel = levelTable.findIndex((thisLevelExp, index) => {
      if (thisLevelExp > expiriencePoints) return index;
    });
    const newAmount = await User.updateOne(
      { _id: session?.user?._id },
      {
        $set: {
          "character.xp": expiriencePoints + expirienceGain,
          "character.level": calculatedLevel,
        },
      }
    );

    return { msg: "Player AP updated" };
  } catch (error) {
    redirect(`/errors?error=${error?.message}`);
  }
}
