import { Schema, model, models } from "mongoose";

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

const playerSchema = new Schema({
  health: { amount: Number, maxAmount: Number, lastUpdatedAt: Date },
  title: { type: String },
  armor: Number,
  companion: { companionName: String, companionType: String, xp: Number, level: Number },
  level: Number,
  xp: Number,
  str: { amount: Number, maxAmount: Number },
  dex: { amount: Number, maxAmount: Number },
  int: { amount: Number, maxAmount: Number },
  cha: { amount: Number, maxAmount: Number },
  spd: { amount: Number, maxAmount: Number },
  acc: { amount: Number, maxAmount: Number },
  ap: { amount: Number, maxAmount: Number, lastUpdatedAt: Date },
  sex: String,
  gold: Number,
  inbox: [messageSchema],
});

const Player = models.player || model("player", playerSchema);
export const Message = models.message || model("message", messageSchema);
export default Player;
