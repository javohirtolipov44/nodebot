import { Schema, model } from "mongoose";

const premiumSchema = new Schema(
  {
    chatId: { type: Number },
    start: { type: Date },
    end: { type: Date },
    file: { type: String },
  },
  {
    versionKey: false,
  }
);

premiumSchema.methods.getFormattedStart = function () {
  return new Date(this.start).toLocaleString("uz-UZ", {
    timeZone: "Asia/Tashkent",
  });
};

const premiumModel = model("premiums", premiumSchema);

export default premiumModel;
