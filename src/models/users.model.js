import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String },
    chatId: { type: Number },
    phone: { type: String, default: "998901234567" },
    admin: { type: Boolean, default: false },
    action: { type: String, default: false },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
  }
);

const userModel = model("users", userSchema);

export default userModel;
