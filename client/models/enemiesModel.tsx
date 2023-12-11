import { Schema, model, models } from "mongoose";

const enemiesSchema = new Schema({
  attack: Number,
  health: Number,
  title: String,
  armor: Number,
  level: Number,
  str: Number,
  dex: Number,
  int: Number,
  cha: Number,
  spd: Number,
  acc: Number,
  sex: String,
  xpReward: Number,
  goldReward: Number,
  timeOfOrigin: String,
  image: String,
  engageApLoss: Number,
  possibleLoot: [
    {
      type: String,
    },
  ],
});

const Enemies = models.enemies || model("enemies", enemiesSchema);
export default Enemies;
