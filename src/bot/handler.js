import bot from "./bot.js";
import { Accept } from "./callback.query.js";
import start from "./start.js";
import path from "node:path";

const HTML = { parse_mode: "HTML" };

bot.on("text", (msg) => {
  const chatId = msg.from.id;
  const text = msg.text;

  if (text === "/start") {
    start(msg, chatId);
  } else {
    bot.sendMessage(chatId, text);
  }

  if (text === "asd") {
    bot.sendMessage(chatId, msg);
  }
});

bot.on("chat_join_request", async (msg) => {
  try {
    const chatId = msg.from.id;
    const txt = `<b>Siz "${msg.chat.title}" kanaliga qo'shilish so'rovini yubordingiz!\n\nTo'liq ma'lumot olish uchun /start tugmasini bosing</b>`;
    await bot.sendMessage(chatId, txt, HTML);
  } catch (error) {
    const Path = import.meta.url;
    await bot.sendMessage(+process.env.ADMIN, error.message + "\n" + Path);
  }

  // try {
  //   await bot.approveChatJoinRequest(chatId, userId);
  //   console.log(`${userId} foydalanuvchisi guruhga qo'shildi`);
  // } catch (error) {
  //   const Path = import.meta.url;
  //   await bot.sendMessage(+process.env.ADMIN, error.message + "\n" + Path);
  // }
});

bot.on("callback_query", (query) => {
  const callbackData = query.data;
  const message = query.message;
  const userId = query.from.id;

  if (callbackData === "accept") {
    Accept(bot, userId);
  }
});

bot.on("photo", (msg) => {
  const chatId = msg.chat.id;
  const photo = msg.photo[msg.photo.length - 1];
  const fileId = photo.file_id;
  console.log(msg);

  bot.sendMessage(chatId, fileId);

  // kod yozzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
});
