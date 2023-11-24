import { Schema, model, models } from "mongoose";

const itemsSchema = new Schema({
  name: { type: String, required: true },
  category: { itemType: String, itemCategory: String },
  rarity: String,
  origin: String,
  armor: Number,
  attack: { from: Number, to: Number },
  level: Number,
  str: { amount: Number, maxAmount: Number },
  dex: { amount: Number, maxAmount: Number },
  int: { amount: Number, maxAmount: Number },
  cha: { amount: Number, maxAmount: Number },
  spd: { amount: Number, maxAmount: Number },
  acc: { amount: Number, maxAmount: Number },
  basisValue: Number,
});

const Item = models.item || model("item", itemsSchema);
export default Item;
