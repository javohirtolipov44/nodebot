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

  const username = checkUser.username
    ? `@${checkUser.username}`
    : "Mavjud emas";
  const txt = `<a href="tg://user?id=${chatId}">${chatId}</a>`;

  bot.sendPhoto(process.env.ADMIN, fileId, {
    parse_mode: "HTML",
    caption: `<b>${txt}\ntg://user?id=${chatId}\nUsername: ${username}</b>`,
    reply_markup: {
      inline_keyboard: keyb3(chatId),
    },
  });

  const text = `Tez orada so'rovingizga javob beramiz!\n\nTushunmovchiliklarni oldini olish maqsadida PREMIUM Kanalga so'rov yuborganingizni yana bir bor tekshirib ko'rishingizni so'raymiz!\n\n${process.env.PREMIUM}`;
  bot.sendMessage(chatId, text);
};

export default mediaFile;
