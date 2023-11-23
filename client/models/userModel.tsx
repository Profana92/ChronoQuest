import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: String,
    image: String,
    role: { type: String, default: "user" },
    provider: { type: String, default: "credentials" },
    character: {
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
    },
  },
  { timestamps: true }
);

const User = models.user || model("user", userSchema);
export default User;
