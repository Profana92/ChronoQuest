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
      health: Number,
      title: { type: String },
      class: String,
      companion: String,
      level: Number,
      xp: Number,
      str: Number,
      dex: Number,
      int: Number,
      cha: Number,
      spd: Number,
      acc: Number,
      ap: Number,
      sex: String,
    },
  },
  { timestamps: true }
);

const User = models.user || model("user", userSchema);
export default User;
