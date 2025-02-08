import { keyb3 } from "../keyboard/inline.js";
import Io from "../utils/io.js";

const io = new Io();

const mediaFile = async (bot, chatId, fileId) => {
  const users = await io.readFile("users.json");
  const checkUser = users.find((user) => user.chatId === chatId);
  if (checkUser) {
    checkUser.file = `${fileId}`;
    await io.writeFile("users.json", users);
  }

  bot.sendPhoto(process.env.ADMIN, fileId, {
    parse_mode: "HTML",
    caption: chatId,
    reply_markup: {
      inline_keyboard: keyb3(chatId),
    },
  });
};

export default mediaFile;
