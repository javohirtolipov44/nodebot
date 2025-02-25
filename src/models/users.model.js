import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    chatId: { type: Number },
    created: { type: Date, default: Date.now() },
    username: { type: String, default: "" },
    file: { type: String, default: "" },
  },
  {
    versionKey: false,
  }
);

userSchema.methods.getFormattedStart = function () {
  return new Date(this.start).toLocaleString("uz-UZ", {
    timeZone: "Asia/Tashkent",
  });
};

const userModel = model("users", userSchema);

export default userModel;
