import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: String,
    image: String,
    role: { type: String, default: "user" },
    provider: { type: String, default: "credentials" },
  },
  { timestamps: true }
);

const User = models.user || model("user", userSchema);
export default User;
