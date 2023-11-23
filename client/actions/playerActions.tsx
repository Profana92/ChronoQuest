"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import User from "@/models/userModel";
import { redirect } from "next/navigation";

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

export async function addNewCharacter({ name, sex }: { name: string; sex: string }) {
  try {
    const duplicate = await User.findOne({ "character.title": name });
    if (duplicate) throw new Error("Character name already taken, please try again.");
    const session = await getServerSession(authOptions);
    const user = await User.findByIdAndUpdate(session?.user?._id, {
      character: {
        armor: 0,
        title: name,
        health: { amount: 100, maxAmount: 100, lastUpdatedAt: Date.now() },
        companion: { companionName: "none", companionType: "none", xp: 0, level: 1 },
        level: 1,
        xp: 0,
        str: { amount: 5, maxAmount: 10 },
        dex: { amount: 5, maxAmount: 10 },
        int: { amount: 5, maxAmount: 10 },
        cha: { amount: 5, maxAmount: 10 },
        spd: { amount: 5, maxAmount: 10 },
        acc: { amount: 5, maxAmount: 10 },
        ap: { amount: 100, maxAmount: 100, lastUpdatedAt: Date.now() },
        sex: sex,
        gold: 10,
      },
    });
    return { msg: "Player sucessfully created" };
  } catch (error) {
    redirect(`/errors?error=${error?.message}`);
  }
}

export async function actionPointsNaturalRegeneration({ intervalPerPoint = 60000 }) {
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

export async function healthPointsNaturalRegeneration({ intervalPerPoint = 60000 }) {
  try {
    const session = await getServerSession(authOptions);
    const { amount, maxAmount, lastUpdatedAt } = (
      await User.findOne({ "character.title": session.user.character.title })
    ).character.health;

    //make sure it is never lower than 0
    if (amount < 0) {
      const newAmount = await User.updateOne(
        { _id: session?.user?._id },
        {
          $set: {
            "character.health.amount": 0,
            "character.health.lastUpdatedAt": new Date(),
          },
        }
      );
    }

    //calculate time difference from last update
    const timeDifference = +new Date() - lastUpdatedAt;
    //calculate action points to add
    const pointsToAdd = timeDifference / intervalPerPoint;
    //calculate pointstoUpdate, if amount + points>100, then return maxAmount, if not return actual value.
    const pointsToUpdate = amount + pointsToAdd > maxAmount ? maxAmount : Math.round(amount + pointsToAdd);
    //update db
    if (amount <= maxAmount) {
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

export async function updateHealthPoints({ valueToRecover = 0 }) {
  try {
    const session = await getServerSession(authOptions);
    const { amount, maxAmount, lastUpdatedAt } = (
      await User.findOne({ "character.title": session.user.character.title })
    ).character.health;

    //Prevent AP from falling belove 0
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

    //if current AP + valueToRecover is even or lesser than maxAmount, set that amount to maxAmount
    if (amount + valueToRecover <= maxAmount) {
      const newAmount = await User.updateOne(
        { _id: session?.user?._id },
        {
          $set: {
            "character.health.amount": amount + valueToRecover,
            "character.health.lastUpdatedAt": new Date(),
          },
        }
      );
    }

    return { msg: `Player Health updated by : ${valueToRecover}` };
  } catch (error) {
    redirect(`/errors?error=${error?.message}`);
  }
}
export async function updateActionPoints({ valueToRecover = 0 }) {
  try {
    const session = await getServerSession(authOptions);

    const maxAmount = await User.findOne({
      "character.title": session.user.character.title,
    });
    console.log("maxAmount", maxAmount);
    console.log("valueToRecover", valueToRecover);
    //if current ap amount >=100 do nothing
    // if (amount >= 100) {
    //   const newAmount = await User.updateOne(
    //     { _id: session?.user?._id },
    //     {
    //       $set: {
    //         "character.ap.amount": 100,
    //         "character.ap.lastUpdatedAt": new Date(),
    //       },
    //     }
    //   );
    //   return;
    // }

    // //calculate time difference from last update
    // const timeDifference = +new Date() - lastUpdatedAt;
    // //calculate action points to add
    // const pointsToAdd = timeDifference / intervalPerPoint;
    // //calculate pointstoUpdate, if amount + points>100, then return 100 as it is max ap, if not return actual value.
    // const pointsToUpdate = amount + pointsToAdd > 100 ? 100 : Math.round(amount + pointsToAdd);

    // if (timeDifference >= intervalPerPoint && amount <= 100) {
    //   const newAmount = await User.updateOne(
    //     { _id: session?.user?._id },
    //     {
    //       $set: {
    //         "character.ap.amount": pointsToUpdate,
    //         "character.ap.lastUpdatedAt": new Date(),
    //       },
    //     }
    //   );
    // }

    return { msg: "Player AP updated" };
  } catch (error) {
    redirect(`/errors?error=${error?.message}`);
  }
}

export async function updateXpAndLevel({ expirienceGain = 0 }) {
  try {
    const session = await getServerSession(authOptions);
    const charactedData = await User.findOne({ "character.title": session.user.character.title });
    // console.log(charactedData);
    const expiriencePoints = charactedData.character.xp;
    //if expirience loss drops exp below zero then exp=0 and level=1
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

    //calculate new level
    const calculatedOldLevel = levelTable.findIndex((thisLevelExp, index) => {
      if (thisLevelExp > expiriencePoints) return index;
    });
    const calculatedLevel = levelTable.findIndex((thisLevelExp, index) => {
      if (thisLevelExp > expiriencePoints + expirienceGain) return index;
    });
    // if new level > old level
    // should add and reset hp
    // should add 10to every maxStat.
    if (calculatedLevel > calculatedOldLevel) {
      const newAmount = await User.updateOne(
        { _id: session?.user?._id },
        {
          $set: {
            "character.health.amount": charactedData.character.health.maxAmount + 10,
            "character.health.maxAmount": charactedData.character.health.maxAmount + 10,
          },
        }
      );
    }
    const newAmount = await User.updateOne(
      { _id: session?.user?._id },
      {
        $set: {
          "character.xp": expiriencePoints + expirienceGain,
          "character.level": calculatedLevel,
        },
      }
    );

    return { msg: "Player XP and Level updated" };
  } catch (error) {
    redirect(`/errors?error=${error?.message}`);
  }
}
