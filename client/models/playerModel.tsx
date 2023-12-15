import { Schema, model, models } from "mongoose";

import { itemsSchema } from "./itemModel";

const messageSchema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  attachment: Object,
});

const fightsHistorySchema = new Schema({
  winner: String,
  dmgDealth: Number,
  dmgRecieved: Number,
  playerDodged: Boolean,
  enemyDodged: Boolean,
  playerBlocked: Boolean,
  enemyBlocked: Boolean,
  message: String,
});

const playerSchema = new Schema({
  health: { amount: Number, maxAmount: Number, lastUpdatedAt: Date },
  title: { type: String },
  armor: { basisValue: Number, amount: Number },
  companion: { companionName: String, companionType: String, xp: Number, level: Number },
  level: Number,
  xp: Number,
  str: { basisValue: Number, amount: Number, maxAmount: Number },
  dex: { basisValue: Number, amount: Number, maxAmount: Number },
  int: { basisValue: Number, amount: Number, maxAmount: Number },
  cha: { basisValue: Number, amount: Number, maxAmount: Number },
  spd: { basisValue: Number, amount: Number, maxAmount: Number },
  acc: { basisValue: Number, amount: Number, maxAmount: Number },
  ap: { amount: Number, maxAmount: Number, lastUpdatedAt: Date },
  sex: String,
  gold: Number,
  inbox: [messageSchema],
  attack: { basisValue: Number, amount: Number },
  inventory: [itemsSchema],
  fightsHistory: [fightsHistorySchema],
  equipedItems: {
    head: itemsSchema,
    chest: itemsSchema,
    leftArm: itemsSchema,
    rightArm: itemsSchema,
    legs: itemsSchema,
    feet: itemsSchema,
    gloves: itemsSchema,
    necklace: itemsSchema,
    belt: itemsSchema,
    ring: itemsSchema,
  },
});

const Player = models.player || model("player", playerSchema);
export const Message = models.message || model("message", messageSchema);
export default Player;
