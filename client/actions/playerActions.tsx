"use server";

import Enemies from "@/models/enemiesModel";
import Item from "@/models/itemModel";
import Player from "@/models/playerModel";
import { Types } from "mongoose";
import User from "@/models/userModel";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { itemType } from "@/types/itemType";
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

export async function fetchUserData({ id }: { id: string; playerName: string }) {
  try {
    const userData = await User.findOne({ _id: id });
    const playerData = await Player.findOne({ title: userData.player });
    return { msg: "Player sucessfully fetched", userData, playerData };
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/errors?error=${error?.message}`);
    }
  }
}

export async function addNewCharacter({ name, sex }: { name: string; sex: string }) {
  try {
    const duplicate = await Player.findOne({ title: name });
    if (duplicate) throw new Error("Character name already taken, please try again.");
    const session = await getServerSession(authOptions);
    await User.findOne({ _id: session?.user?._id });
    await User.findByIdAndUpdate(session?.user?._id, {
      player: name,
    });
    const playerInPlayers = new Player({
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
      inbox: [],
      attack: 1,
      inventory: [],
      equipedItems: {
        head: null,
        chest: null,
        leftArm: null,
        rightArm: null,
        legs: null,
        feet: null,
        gloves: null,
        necklace: null,
        belt: null,
        ring: null,
      },
    });
    playerInPlayers.save();
    return { msg: "Player sucessfully created" };
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/errors?error=${error?.message}`);
    }
  }
}

export async function actionPointsNaturalRegeneration({
  player,
  intervalPerPoint = 60000,
}: {
  player: string;
  intervalPerPoint: number;
}) {
  try {
    const { amount, maxAmount, lastUpdatedAt } = (await Player.findOne({ title: player })).ap;

    // if current ap amount >=maxAmount update time
    if (amount >= maxAmount) {
      const newAmount = await Player.updateOne(
        { title: player },
        {
          $set: {
            "ap.amount": maxAmount,
            "ap.lastUpdatedAt": new Date(),
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
    const pointsToUpdate = amount + pointsToAdd >= maxAmount ? maxAmount : Math.round(amount + pointsToAdd);

    if (timeDifference >= intervalPerPoint && amount <= maxAmount) {
      const newAmount = await Player.updateOne(
        { title: player },
        {
          $set: {
            "ap.amount": pointsToUpdate,
            "ap.lastUpdatedAt": new Date(),
          },
        }
      );
    }

    return { msg: "Player AP updated" };
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/errors?error=${error?.message}`);
    }
  }
}

export async function healthPointsNaturalRegeneration({
  player,
  intervalPerPoint = 60000,
}: {
  player: string;
  intervalPerPoint: number;
}) {
  try {
    const { amount, maxAmount, lastUpdatedAt } = (await Player.findOne({ title: player })).health;
    //make sure it is never lower than 0
    if (amount < 0) {
      const newAmount = await Player.updateOne(
        { title: player },
        {
          $set: {
            "health.amount": 0,
            "health.lastUpdatedAt": new Date(),
          },
        }
      );
    }
    if (amount > maxAmount) {
      const newAmount = await Player.updateOne(
        { title: player },
        {
          $set: {
            "health.amount": maxAmount,
            "health.lastUpdatedAt": new Date(),
          },
        }
      );
      return;
    }

    //calculate time difference from last update
    const timeDifference = +new Date() - lastUpdatedAt;
    //calculate action points to add
    const pointsToAdd = timeDifference / intervalPerPoint;
    //calculate pointstoUpdate, if amount + points>100, then return maxAmount, if not return actual value.
    const pointsToUpdate = amount + pointsToAdd > maxAmount ? maxAmount : Math.round(amount + pointsToAdd);
    //update db
    if (amount + pointsToAdd <= maxAmount) {
      const newAmount = await Player.updateOne(
        { title: player },
        {
          $set: {
            "health.amount": pointsToUpdate,
            "health.lastUpdatedAt": new Date(),
          },
        }
      );
    }

    return { msg: "Player Health updated" };
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/errors?error=${error?.message}`);
    }
  }
}

export async function updateHealthPoints({ player, valueToRecover = 0 }: { player: string; valueToRecover: number }) {
  try {
    const { amount, maxAmount } = (await Player.findOne({ title: player })).health;

    //Prevent HP from falling belove 0
    if (amount + valueToRecover < 0) {
      const newAmount = await Player.updateOne(
        { title: player },
        {
          $set: {
            "health.amount": 0,
            "health.lastUpdatedAt": new Date(),
          },
        }
      );

      return;
    }

    //if current hP + valueToRecover is even or lesser than maxAmount, set that amount to maxAmount
    if (amount + valueToRecover <= maxAmount) {
      const newAmount = await Player.updateOne(
        { title: player },
        {
          $set: {
            "health.amount": amount + valueToRecover,
            "health.lastUpdatedAt": new Date(),
          },
        }
      );
    }

    return { msg: `Player Health updated by : ${valueToRecover}` };
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/errors?error=${error?.message}`);
    }
  }
}

export async function updateActionPoints({ player, valueToRecover = 0 }: { player: string; valueToRecover: number }) {
  try {
    const { amount, maxAmount } = (await Player.findOne({ title: player })).ap;

    //make sure that ap never falls below 0
    if (amount + valueToRecover < 0) {
      return { msg: "Action points too low." };
    }
    // if current ap amount + valueToRecover >=maxAmount set ap to maxAmount, update last update date and do nothing.

    if (amount + valueToRecover >= maxAmount) {
      const newAmount = await Player.updateOne(
        { title: player },
        {
          $set: {
            "ap.amount": maxAmount,
            lastUpdatedAt: new Date(),
          },
        }
      );
      return;
    }
    //update value
    if (amount + valueToRecover <= maxAmount) {
      const newAmount = await Player.updateOne(
        { title: player },
        {
          $set: {
            "ap.amount": amount + valueToRecover,
            "ap.lastUpdatedAt": new Date(),
          },
        }
      );
    }

    return { msg: "Player AP updated" };
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/errors?error=${error?.message}`);
    }
  }
}

export async function updateXpAndLevel({ player, expirienceGain = 0 }: { player: string; expirienceGain: number }) {
  try {
    const charactedData = await Player.findOne({ title: player });
    const expiriencePoints = charactedData.xp;
    //if expirience loss drops exp below zero then exp=0 and level=1
    if (expiriencePoints + expirienceGain <= 0) {
      const newAmount = await Player.updateOne(
        { title: player },
        {
          $set: {
            xp: 0,
            level: 1,
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
    // if new level > old level (level up)
    // should add and reset hp
    // should add 10to every maxStat.
    if (calculatedLevel > calculatedOldLevel) {
      const newAmount = await Player.updateOne(
        { title: player },
        {
          $set: {
            "health.amount": charactedData.health.maxAmount + 10,
            "health.maxAmount": charactedData.health.maxAmount + 10,
            "str.maxAmount": charactedData.str.maxAmount + 10,
            "dex.maxAmount": charactedData.dex.maxAmount + 10,
            "int.maxAmount": charactedData.int.maxAmount + 10,
            "cha.maxAmount": charactedData.cha.maxAmount + 10,
            "spd.maxAmount": charactedData.spd.maxAmount + 10,
            "acc.maxAmount": charactedData.acc.maxAmount + 10,
          },
        }
      );
    }

    // if new level < old level (level down)
    // should subtract and reset hp
    // should remove 10 from every maxStat.
    if (calculatedLevel < calculatedOldLevel) {
      const newAmount = await Player.updateOne(
        { title: player },
        {
          $set: {
            "health.amount": charactedData.health.maxAmount - 10,
            "health.maxAmount": charactedData.health.maxAmount - 10,
            "str.maxAmount": charactedData.str.maxAmount - 10,
            "dex.maxAmount": charactedData.dex.maxAmount - 10,
            "int.maxAmount": charactedData.int.maxAmount - 10,
            "cha.maxAmount": charactedData.cha.maxAmount - 10,
            "spd.maxAmount": charactedData.spd.maxAmount - 10,
            "acc.maxAmount": charactedData.acc.maxAmount - 10,
            "str.amount":
              charactedData.str.amount > charactedData.str.maxAmount - 10
                ? charactedData.str.maxAmount - 10
                : charactedData.str.amount,
            "dex.amount":
              charactedData.dex.amount > charactedData.dex.maxAmount - 10
                ? charactedData.dex.maxAmount - 10
                : charactedData.dex.amount,
            "character.int.amount":
              charactedData.int.amount > charactedData.int.maxAmount - 10
                ? charactedData.int.maxAmount - 10
                : charactedData.int.amount,
            "character.cha.amount":
              charactedData.cha.amount > charactedData.cha.maxAmount - 10
                ? charactedData.cha.maxAmount - 10
                : charactedData.cha.amount,
            "character.spd.amount":
              charactedData.spd.amount > charactedData.spd.maxAmount - 10
                ? charactedData.spd.maxAmount - 10
                : charactedData.spd.amount,
            "character.acc.amount":
              charactedData.acc.amount > charactedData.acc.maxAmount - 10
                ? charactedData.acc.maxAmount - 10
                : charactedData.acc.amount,
          },
        }
      );
    }
    const newAmount = await Player.updateOne(
      { title: player },
      {
        $set: {
          xp: expiriencePoints + expirienceGain,
          level: calculatedLevel,
        },
      }
    );

    return { msg: "Player XP and Level updated" };
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/errors?error=${error?.message}`);
    }
  }
}

export async function updateStats({
  player,
  statsToUpdate,
  pointsGain = 1,
}: {
  player: string;
  statsToUpdate: string;
  pointsGain: number;
}) {
  try {
    const charactedData = await Player.findOne({ title: player });
    if (charactedData[statsToUpdate].amount + pointsGain < 1) {
      const newAmount = await Player.updateOne(
        { title: player },
        {
          $set: {
            [`${statsToUpdate}.amount`]: 1,
          },
        }
      );
      return;
    }
    if (charactedData[statsToUpdate].amount + pointsGain > charactedData[statsToUpdate].maxAmount) {
      const newAmount = await Player.updateOne(
        { title: player },
        {
          $set: {
            [`${statsToUpdate}.amount`]: charactedData[statsToUpdate].maxAmount,
          },
        }
      );
      return;
    }

    const newAmount = await Player.updateOne(
      { title: player },
      {
        $set: {
          [`${statsToUpdate}.amount`]: charactedData[statsToUpdate].amount + pointsGain,
        },
      }
    );

    return { msg: "Player XP and Level updated" };
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/errors?error=${error?.message}`);
    }
  }
}
export async function buySkill({
  player,
  skillCost,
  statsToUpdate,
  pointsGain = 1,
}: {
  player: string;
  skillCost: number;
  statsToUpdate: string;
  pointsGain: number;
}) {
  try {
    const charactedData = await Player.findOne({ title: player });
    if (charactedData.gold - skillCost * charactedData[statsToUpdate].amount < 0)
      return { msg: "Player skill not updated. Not enough gold!" };
    if (charactedData[statsToUpdate].amount + pointsGain > charactedData[statsToUpdate].maxAmount) {
      const newAmount = await Player.updateOne(
        { title: player },
        {
          $set: {
            [`${statsToUpdate}.amount`]: charactedData[statsToUpdate].maxAmount,
          },
        }
      );
      return { msg: "Player Gold not updated. Exceeding Max Value" };
    }
    await Player.updateOne(
      { title: player },
      {
        $set: {
          gold: charactedData.gold - skillCost * charactedData[statsToUpdate].amount,
        },
      }
    );
    if (charactedData[statsToUpdate].amount + pointsGain < 1) {
      const newAmount = await Player.updateOne(
        { title: player },
        {
          $set: {
            [`${statsToUpdate}.amount`]: 1,
          },
        }
      );
      return;
    }

    const newAmount = await Player.updateOne(
      { title: player },
      {
        $set: {
          [`${statsToUpdate}.amount`]: charactedData[statsToUpdate].amount + pointsGain,
        },
      }
    );

    return { msg: "Player Gold updated" };
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/errors?error=${error?.message}`);
    }
  }
}
export async function adminAddNewBasisItem({
  itemName,
  category,
  rarity,
  origin,
  itemLevel,
  stats,
  basisValue,
  image,
}: {
  itemName: string;
  category: { itemType: string; itemCategory: string };
  rarity: number;
  origin: string;
  itemLevel: number;
  stats: {
    str: number;
    dex: number;
    int: number;
    cha: number;
    spd: number;
    acc: number;
    armor: number;
    attack: { from: number; to: number };
  };
  basisValue: number;
  image: string;
}) {
  try {
    if (await Item.findOne({ itemName: itemName })) throw new Error("Item already exists");
    const item = new Item({
      itemName: itemName,
      category: { itemType: category.itemType, itemCategory: category.itemCategory },
      rarity: rarity,
      origin: origin,
      itemLevel: itemLevel,
      stats: {
        str: stats.str,
        dex: stats.dex,
        int: stats.int,
        cha: stats.cha,
        spd: stats.spd,
        acc: stats.acc,
        armor: stats.armor,
        attack: { from: stats.attack.from, to: stats.attack.to },
      },
      basisValue: basisValue,
      image: image,
    });
    item.save();
    return { msg: "Item successfully created" };
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/errors?error=${error?.message}`);
    }
  }
}

export async function adminRemoveBasisItem({ itemName }: { itemName: string }) {
  try {
    if (!(await Item.findOne({ itemName: itemName }))) throw new Error("Item does not exists");
    const deletedItem = await Item.deleteOne({ itemName: itemName });
    return { msg: "Item successfully deleted" };
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/errors?error=${error?.message}`);
    }
  }
}

export async function generateItem({ itemBasis, origin }: { itemBasis: string; origin: string }) {
  try {
    const basisItemData = await Item.findOne({ itemName: itemBasis });
    const rarityFactors = [1, 1.5, 2, 2.5, 3];
    const rarityProbability = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3,
      4,
    ];

    //determine new item rarity
    const itemRarity = rarityProbability[Math.floor(Math.random() * rarityProbability.length)];
    //determine new item stats
    const newItem = {
      itemName: basisItemData.itemName,
      category: {
        itemType: basisItemData.category.itemType,
        itemCategory: basisItemData.category.itemCategory,
      },
      rarity: itemRarity,
      origin: origin,
      itemLevel: basisItemData.itemLevel,
      basisValue: Math.floor(basisItemData.basisValue * rarityFactors[itemRarity]),
      image: basisItemData.image,
      stats: {
        attack: {
          from: Math.floor(basisItemData.stats.attack.from * rarityFactors[itemRarity]),
          to: Math.floor(basisItemData.stats.attack.to * rarityFactors[itemRarity]),
        },
        str: Math.floor(basisItemData.stats.str * rarityFactors[itemRarity]),
        dex: Math.floor(basisItemData.stats.dex * rarityFactors[itemRarity]),
        int: Math.floor(basisItemData.stats.int * rarityFactors[itemRarity]),
        cha: Math.floor(basisItemData.stats.cha * rarityFactors[itemRarity]),
        spd: Math.floor(basisItemData.stats.spd * rarityFactors[itemRarity]),
        acc: Math.floor(basisItemData.stats.acc * rarityFactors[itemRarity]),
        armor: Math.floor(basisItemData.stats.armor * rarityFactors[itemRarity]),
      },
      slot: basisItemData.slot,
    };

    return { msg: "Item successfully generated", generatedItem: newItem };
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/errors?error=${error?.message}`);
    }
  }
}

export async function addMessageToInbox({
  message,
  recipient,
  itemBasis,
  sender,
}: {
  message: string;
  recipient: string;
  itemBasis: string | null;
  sender: string;
}) {
  try {
    if (itemBasis !== null) {
      const attachment = await generateItem({ itemBasis: itemBasis, origin: sender });
      const completeMessage = { message: message, attachment: attachment?.generatedItem, sender: sender };
      const inboxUpdate = await Player.findOneAndUpdate({ title: recipient }, { $push: { inbox: completeMessage } });
    } else {
      const completeMessage = { message: message, attachment: null, sender: sender };
      const inboxUpdate = await Player.findOneAndUpdate({ title: recipient }, { $push: { inbox: completeMessage } });
    }
    return { msg: "Message sent successfully" };
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/errors?error=${error?.message}`);
    }
  }
}

export async function removeMessageFromInbox({
  characterName,
  idToDelete,
}: {
  characterName: string;
  idToDelete: Types.ObjectId;
}) {
  try {
    const deleteItem = await Player.updateOne({ title: characterName }, { $pull: { inbox: { _id: idToDelete } } });
    return { msg: "Message deleted successfully" };
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/errors?error=${error?.message}`);
    }
  }
}
export async function moveMessageAttachmentToInventory({
  characterName,
  itemToMove,
  idToDelete,
}: {
  characterName: string;
  itemToMove: itemType;
  idToDelete: string;
}) {
  try {
    //add to inventory
    const inboxUpdate = await Player.findOneAndUpdate({ title: characterName }, { $push: { inventory: itemToMove } });
    //remove from message
    const deleteItem = await Player.updateOne(
      { title: characterName, "inbox._id": idToDelete },
      { $unset: { "inbox.$.attachment": 1 } }
    );
    return { msg: "Attachment moved successfully" };
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/errors?error=${error?.message}`);
    }
  }
}

export async function itemRemoveStats({
  characterName,
  itemToEquip,
  statsToUpdate,
}: {
  characterName: string;
  itemToEquip: itemType;
  statsToUpdate: "str" | "dex" | "int" | "cha" | "spd" | "acc" | "armor" | "attack";
}) {
  try {
    const userDocument = await Player.findOne({ title: characterName });
    if (statsToUpdate === "armor") {
      await Player.findOneAndUpdate(
        { title: characterName },
        { $set: { [`${statsToUpdate}`]: userDocument[statsToUpdate] - itemToEquip.stats[statsToUpdate] } }
      );
      return { msg: "Attachment moved successfully" };
    }
    await Player.findOneAndUpdate(
      { title: characterName },
      { $set: { [`${statsToUpdate}.amount`]: userDocument[statsToUpdate].amount - itemToEquip.stats[statsToUpdate] } }
    );
    return { msg: "Attachment moved successfully" };
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/errors?error=${error?.message}`);
    }
  }
}
export async function itemAddStats({
  characterName,
  itemToEquip,
  statsToUpdate,
}: {
  characterName: string;
  itemToEquip: itemType;
  statsToUpdate: "str" | "dex" | "int" | "cha" | "spd" | "acc" | "armor" | "attack";
}) {
  try {
    const userDocument = await Player.findOne({ title: characterName });
    if (statsToUpdate === "armor") {
      await Player.findOneAndUpdate(
        { title: characterName },
        { $set: { [`${statsToUpdate}`]: userDocument[statsToUpdate] + itemToEquip.stats[statsToUpdate] } }
      );
      return { msg: "Attachment moved successfully" };
    }
    await Player.findOneAndUpdate(
      { title: characterName },
      { $set: { [`${statsToUpdate}.amount`]: userDocument[statsToUpdate].amount + itemToEquip.stats[statsToUpdate] } }
    );
    return { msg: "Attachment moved successfully" };
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/errors?error=${error?.message}`);
    }
  }
}
export async function equipItem({ characterName, itemToEquip }: { characterName: string; itemToEquip: itemType }) {
  try {
    const slots = {
      leftArm: "Left Hand",
      rightArm: "Right Hand",
      head: "Head",
      chest: "Chest",
      legs: "Legs",
      feet: "Feet",
      gloves: "Gloves",
      necklace: "Necklace",
      belt: "Belt",
      ring: "Ring",
    };
    const foundSlot = Object.entries(slots).find(([slot, value]) => value === itemToEquip?.slot);
    if (foundSlot !== undefined) {
      //if some item already in slot
      const userDocument = await Player.findOne({ title: characterName });
      console.log("🚀 ~ file: playerActions.tsx:705 ~ equipItem ~ userDocument:", userDocument);
      const userSlot = userDocument.equipedItems[foundSlot[0]];
      if (userSlot) {
        const unequipResult = await unequipItem({
          characterName,
          itemToUnequip: userSlot,
        });
      }

      // place in proper slot
      const equipItem = await Player.findOneAndUpdate(
        { title: characterName },
        { $set: { [`equipedItems.${foundSlot[0]}`]: itemToEquip } }
      );

      console.log(itemToEquip);
      // add item stats to player stats
      itemAddStats({ characterName, itemToEquip, statsToUpdate: "attack" });
      itemAddStats({ characterName, itemToEquip, statsToUpdate: "armor" });
      itemAddStats({ characterName, itemToEquip, statsToUpdate: "str" });

      // await Player.findOneAndUpdate(
      //   { title: characterName },
      //   { $set: { "str.amount": userDocument.str.amount + itemToEquip.stats.str } }
      // );
      // remove from inventory
      const inboxUpdate = await Player.findOneAndUpdate(
        { title: characterName },
        { $pull: { inventory: { _id: itemToEquip?._id } } }
      );
    }
    //add to inventory
    // const inboxUpdate = await Player.findOneAndUpdate({ title: characterName }, { $set: { `inventory.${itemToMove.}`: itemToMove } });
    //remove from message
    // const deleteItem = await Player.updateOne(
    //   { title: characterName, "inbox._id": idToDelete },
    //   { $unset: { "inbox.$.attachment": 1 } }
    // );
    return { msg: "Attachment moved successfully" };
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/errors?error=${error?.message}`);
    }
  }
}
export async function unequipItem({
  characterName,
  itemToUnequip,
}: {
  characterName: string;
  itemToUnequip: itemType;
}) {
  try {
    //add to inventory
    const inboxUpdate = await Player.findOneAndUpdate(
      { title: characterName },
      { $push: { inventory: itemToUnequip } }
    );
    // remove from equiped items

    const slots = {
      leftArm: "Left Hand",
      rightArm: "Right Hand",
      head: "Head",
      chest: "Chest",
      legs: "Legs",
      feet: "Feet",
      gloves: "Gloves",
      necklace: "Necklace",
      belt: "Belt",
      ring: "Ring",
    };
    const foundSlot = Object.entries(slots).find(([slot, value]) => value === itemToUnequip?.slot);
    if (foundSlot !== undefined) {
      const equipItem = await Player.findOneAndUpdate(
        { title: characterName },
        { $set: { [`equipedItems.${foundSlot[0]}`]: null } }
      );
    }

    return { msg: "Item unequipped successfully" };
  } catch (error) {
    if (error instanceof Error) {
      redirect(`/errors?error=${error?.message}`);
    }
  }
}
export async function triggerBattle({ player, enemy }: { player: string; enemy: string }) {
  const playerData = await Player.findOne({ title: player });
  const enemyData = await Enemies.findOne({ title: enemy });

  //Check AP amount, to allow fight
  const apUpdate = await updateActionPoints({ player, valueToRecover: -enemyData.engageApLoss });
  if (apUpdate?.msg === "Action points too low.") return apUpdate;

  const calcEvadeChances = () => {
    let playerEvadeChance = (playerData.spd.amount - enemyData.spd) / playerData.spd.maxAmount;
    let enemyEvadeChance = enemyData.spd / playerData.spd.maxAmount;
    playerEvadeChance = playerEvadeChance <= 0 ? 0 : playerEvadeChance >= 0.4 ? 0.4 : playerEvadeChance;
    enemyEvadeChance = enemyEvadeChance <= 0 ? 0 : enemyEvadeChance >= 0.4 ? 0.4 : enemyEvadeChance;
    return { playerEvadeChance: +playerEvadeChance.toFixed(2), enemyEvadeChance: +enemyEvadeChance.toFixed(2) };
  };

  const calcBlockChance = () => {
    let playerBlockChance = (playerData.str.amount - enemyData.str) / playerData.str.maxAmount;
    let enemyBlockChance = enemyData.str / playerData.str.maxAmount;
    playerBlockChance = playerBlockChance <= 0 ? 0 : playerBlockChance >= 0.4 ? 0.4 : playerBlockChance;
    enemyBlockChance = enemyBlockChance <= 0 ? 0 : enemyBlockChance >= 0.4 ? 0.4 : enemyBlockChance;
    return { playerBlockChance: +playerBlockChance.toFixed(2), enemyBlockChance: +enemyBlockChance.toFixed(2) };
  };

  const calcDoubleStrikeChance = () => {
    let playerDoubleStrikeChance = (playerData.acc.amount - enemyData.acc) / playerData.acc.maxAmount;
    let enemyDoubleStrikeChance = enemyData.acc / playerData.acc.maxAmount;
    playerDoubleStrikeChance =
      playerDoubleStrikeChance <= 0 ? 0 : playerDoubleStrikeChance >= 1 ? 1 : playerDoubleStrikeChance;
    enemyDoubleStrikeChance =
      enemyDoubleStrikeChance <= 0 ? 0 : enemyDoubleStrikeChance >= 1 ? 1 : enemyDoubleStrikeChance;
    return {
      playerDoubleStrikeChance: +playerDoubleStrikeChance.toFixed(2),
      enemyDoubleStrikeChance: +enemyDoubleStrikeChance.toFixed(2),
    };
  };

  const calcCriticalHitChance = () => {
    let playerCriticalHitChance = (playerData.dex.amount - enemyData.dex) / playerData.dex.maxAmount;
    let enemyCriticalHitChance = enemyData.dex / playerData.dex.maxAmount;
    playerCriticalHitChance =
      playerCriticalHitChance <= 0 ? 0 : playerCriticalHitChance >= 1 ? 1 : playerCriticalHitChance;
    enemyCriticalHitChance = enemyCriticalHitChance <= 0 ? 0 : enemyCriticalHitChance >= 1 ? 1 : enemyCriticalHitChance;
    return {
      playerCriticalHitChance: +playerCriticalHitChance.toFixed(2),
      enemyCriticalHitChance: +enemyCriticalHitChance.toFixed(2),
    };
  };

  const calcHealthRegenChance = () => {
    let playerhealthRegenChance = (playerData.int.amount - enemyData.int) / playerData.int.maxAmount;
    let enemyhealthRegenChance = enemyData.int / playerData.int.maxAmount;
    playerhealthRegenChance =
      playerhealthRegenChance <= 0 ? 0 : playerhealthRegenChance >= 1 ? 1 : playerhealthRegenChance;
    enemyhealthRegenChance = enemyhealthRegenChance <= 0 ? 0 : enemyhealthRegenChance >= 1 ? 1 : enemyhealthRegenChance;
    return {
      playerhealthRegenChance: +playerhealthRegenChance.toFixed(2),
      enemyhealthRegenChance: +enemyhealthRegenChance.toFixed(2),
    };
  };

  const trueOrNotBasedOnProbability = (percentageChanceOfTrue: number) => {
    return Math.random() < percentageChanceOfTrue;
  };

  const damageDoubleOrNot = (valueToBeDoubled: number, shouldBeDoubled: boolean) => {
    if (shouldBeDoubled) {
      return 2 * valueToBeDoubled;
    } else {
      return valueToBeDoubled;
    }
  };

  const criticaHitOrNot = (valueToBeTripled: number, shouldBeTripled: boolean) => {
    if (shouldBeTripled) {
      return 3 * valueToBeTripled;
    } else {
      return valueToBeTripled;
    }
  };

  const healOrNot = (valueToBeHealed: number, shouldBeHealed: boolean) => {
    if (shouldBeHealed) {
      return 3 * valueToBeHealed;
    } else {
      return valueToBeHealed;
    }
  };

  const bothEvadeChances = calcEvadeChances();
  const bothBlockChances = calcBlockChance();
  const bothDoubleDmgChances = calcDoubleStrikeChance();
  const bothCriticalHitChances = calcCriticalHitChance();
  const bothHealthRegenChance = calcHealthRegenChance();

  const fightResult: { playerWon: boolean; rounds: { playerWonRound: boolean }[] } = { playerWon: false, rounds: [] };
  let playerHpBeforeFight = playerData.health.amount;
  let enemyHpBeforeFight = enemyData.health.amount;
  const calculateBothDmg = (
    playerDoubleStrike: boolean,
    enemyDoubleStrike: boolean,
    playerCriticalStrike: boolean,
    enemyCriticalStrike: boolean,
    playerhealthRegen: boolean,
    enemyhealthRegen: boolean,
    playerEvaded: boolean,
    enemyEvaded: boolean,
    playerBlocked: boolean,
    enemyBlocked: boolean
  ) =>
    //Take base dmg, combine with strenght and enemy armor, check if double and critical, subtract healedValue
    {
      console.log(enemyData.attack);
      let playerDmg =
        damageDoubleOrNot(
          criticaHitOrNot(
            playerData.attack + Math.floor(playerData.str.amount / 2) - enemyData.armor,
            playerCriticalStrike
          ),
          playerDoubleStrike
        ) - healOrNot(Math.floor(enemyData.int / 2), enemyhealthRegen);
      playerDmg = playerDmg < 0 ? 0 : playerDmg;
      let enemyDmg =
        damageDoubleOrNot(
          criticaHitOrNot(enemyData.attack + Math.floor(enemyData.str / 2) - playerData.armor, enemyCriticalStrike),
          enemyDoubleStrike
        ) - healOrNot(Math.floor(playerData.int.amount / 2), playerhealthRegen);
      enemyDmg = enemyDmg < 0 ? 0 : enemyDmg;

      const returnedValue = { playerDmg: Math.floor(playerDmg / 10), enemyDmg: Math.floor(enemyDmg / 10) };

      if (playerEvaded) returnedValue.enemyDmg = 0;
      if (enemyEvaded) returnedValue.playerDmg = 0;
      if (playerBlocked) returnedValue.enemyDmg = 0;
      if (enemyBlocked) returnedValue.playerDmg = 0;
      return returnedValue;
    };

  for (let i = 0; i < 10; i++) {
    const playerEvaded = trueOrNotBasedOnProbability(bothEvadeChances.playerEvadeChance);
    const enemyEvaded = trueOrNotBasedOnProbability(bothEvadeChances.enemyEvadeChance);
    const playerBlocked = trueOrNotBasedOnProbability(bothBlockChances.playerBlockChance);
    const enemyBlocked = trueOrNotBasedOnProbability(bothBlockChances.enemyBlockChance);
    const playerDoubleStrike = trueOrNotBasedOnProbability(bothDoubleDmgChances.playerDoubleStrikeChance);
    const enemyDoubleStrike = trueOrNotBasedOnProbability(bothDoubleDmgChances.enemyDoubleStrikeChance);
    const playerCriticalStrike = trueOrNotBasedOnProbability(bothCriticalHitChances.playerCriticalHitChance);
    const enemyCriticalStrike = trueOrNotBasedOnProbability(bothCriticalHitChances.enemyCriticalHitChance);
    const playerhealthRegen = trueOrNotBasedOnProbability(bothHealthRegenChance.playerhealthRegenChance);
    const enemyhealthRegen = trueOrNotBasedOnProbability(bothHealthRegenChance.enemyhealthRegenChance);
    const { playerDmg, enemyDmg } = calculateBothDmg(
      playerDoubleStrike,
      enemyDoubleStrike,
      playerCriticalStrike,
      enemyCriticalStrike,
      playerhealthRegen,
      enemyhealthRegen,
      playerEvaded,
      enemyEvaded,
      playerBlocked,
      enemyBlocked
    );
    const roundSummary = {
      playerHpLoss: enemyDmg,
      enemyHpLoss: playerDmg,
      playerWonRound: playerDmg >= enemyDmg ? true : false,
    };

    fightResult.rounds.push(roundSummary);
    playerHpBeforeFight -= enemyDmg;
    enemyHpBeforeFight -= playerDmg;

    if (playerHpBeforeFight <= 0) {
      fightResult.playerWon = false;
      break;
    }
    if (enemyHpBeforeFight <= 0) {
      fightResult.playerWon = true;
      break;
    }
    //  if(i===9)
    //calc evade changes for player and enemy
  }

  const numberOfPlayerWonRounds = fightResult.rounds.reduce((acc, cur) => {
    if (cur.playerWonRound) {
      acc++;
    }
    return acc;
  }, 0);
  const numberOfEnemyWonRounds = fightResult.rounds.reduce((acc, cur) => {
    if (!cur.playerWonRound) {
      acc++;
    }
    return acc;
  }, 0);

  if (fightResult.rounds.length === 10 && numberOfPlayerWonRounds >= numberOfEnemyWonRounds) {
    fightResult.playerWon = true;
  } else fightResult.playerWon = false;
  if (playerHpBeforeFight < 0) playerHpBeforeFight = 0;

  updateXpAndLevel({ player, expirienceGain: enemyData.xpReward });
  const inboxUpdate = await Player.findOneAndUpdate(
    { title: player },
    {
      $set: {
        "health.amount": playerHpBeforeFight,
        gold: fightResult.playerWon ? playerData?.gold + enemyData.goldReward : playerData?.gold,
      },
    }
  );
  const item = enemyData.possibleLoot[Math.floor(Math.random() * enemyData.possibleLoot.length)];
  const message = `You have successfully defeated enemy: ${enemyData.title}. By doing that, you got ${enemyData.goldReward} Gold and ${item}`;

  if (fightResult.playerWon)
    addMessageToInbox({
      message: message,
      recipient: player,
      itemBasis: item,
      sender: enemyData.title,
    });

  //IN THIS GAME //
  // SPD -> Evade chande
  // ACC -> Double Dmg Chance
  // STR -> Block chance
  // DEX -> Critical Hit
  // INT -> Health regen after round +
  // CHA -> SHOP/UPGRADE PRICES
}

// export async function addCompanion({ player, companion }: { player: string; companion: string }) {
//   try {
//     const companionData = await Companion.findOne({ title: companion });
//     return { msg: "Companion added successfully" };
//   } catch (error) {
//     if (error instanceof Error) {
//       redirect(`/errors?error=${error?.message}`);
//     }
//   }
// }
export async function equipCompanion() {}
export async function unequipCompanion() {}
export async function switchCompanion() {}
