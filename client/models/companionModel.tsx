import { Schema, model, models } from "mongoose";

const companionsSchema = new Schema({
  title: String,
  category: String,
  level: Number,
  image: String,
});

const Companion = models.companion || model("companion", companionsSchema);
export default Companion;
