import { Types } from "mongoose";

export type inboxMessageType = {
  sender: string;
  message: string;
  attachment: {
    itemName: string;
    category: {
      itemType: string;
      itemCategory: string;
    };
    rarity: number;
    origin: string;
    itemLevel: number;
    basisValue: number;
    image: string;
    stats: {
      attack: { from: number; to: number };
      str: number;
      dex: number;
      int: number;
      cha: number;
      spd: number;
      acc: number;
      armor: number;
    };
  };
  _id: Types.ObjectId;
};
