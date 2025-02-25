import bot from "./bot.js";
import { keyb1 } from "../keyboard/inline.js";
import userModel from "../models/users.model.js";

const OPTION = {
  parse_mode: "HTML",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: keyb1,
  },
};

const start = async (msg, chatId) => {
  const checkUser = await userModel.findOne({ chatId });
  const text = `<b>Bu Telegram Premium emas!\n\nBu bot orqali AniBro Premium pullik kanaliga obuna sotib olishingiz mumkin!\n\nTo'liq ma'lumotni quyidagi havola orqali olishingiz mumkin!</b>`;

  if (!checkUser) {
    await userModel.create({
      chatId,
      created: Date.now(),
      username: msg.from.username || "",
      file: "",
    });

    bot.sendMessage(chatId, text, OPTION);
  } else {
    bot.sendMessage(chatId, text, OPTION);
  }
};

export default start;
