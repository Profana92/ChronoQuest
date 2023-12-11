import { Types } from "mongoose";

export type itemType = {
  itemName: string;
  slot: string;
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
  _id: Types.ObjectId;
};
