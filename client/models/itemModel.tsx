import { Schema, model, models } from "mongoose";

const itemsSchema = new Schema({
  itemName: { type: String, required: true, unique: true },
  category: { itemType: String, itemCategory: String },
  rarity: Number,
  origin: String,
  itemLevel: Number,
  stats: {
    str: Number,
    dex: Number,
    int: Number,
    cha: Number,
    spd: Number,
    acc: Number,
    armor: Number,
    attack: { from: Number, to: Number },
  },
  basisValue: Number,
  image: String,
});

const Item = models.item || model("item", itemsSchema);
export default Item;
