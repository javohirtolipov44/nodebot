import bot from "./bot.js";
import Io from "../utils/io.js";
import { keyb1 } from "../keyboard/inline.js";

const OPTION = {
  parse_mode: "HTML",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: keyb1,
  },
};

const start = async (msg, chatId) => {
  const io = new Io();
  const users = await io.readFile("users.json");
  const checkUser = users.find((user) => user.chatId === chatId);
  const text = `<b>Bu Telegram Premium emas!\n\nBu bot orqali AniBro Premium pullik kanaliga obuna sotib olishingiz mumkin!\n\nTo'liq ma'lumotni quyidagi havola orqali olishingiz mumkin!</b>`;

  if (!checkUser) {
    users.push({
      chatId,
      created: Date.now(),
      username: msg.from.username || "",
      file: "",
    });

    await io.writeFile("users.json", users);
    bot.sendMessage(chatId, text, OPTION);
  } else {
    bot.sendMessage(chatId, text, OPTION);
  }
};

export default start;
