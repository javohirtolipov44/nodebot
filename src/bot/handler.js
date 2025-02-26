import bot from "./bot.js";
import { Accept, Cancel, userPremium } from "./callback.query.js";
import mediaFile from "./file.js";
import start from "./start.js";

const HTML = { parse_mode: "HTML" };

bot.on("text", async (msg) => {
  const chatId = msg.from.id;
  const text = msg.text;
  try {
    if (text === "/start") {
      start(msg, chatId);
    } else {
      bot.sendMessage(chatId, text);
    }

    if (text === "asd") {
      bot.sendMessage(chatId, msg);
    }
  } catch (error) {
    const Path = import.meta.url;
    await bot.sendMessage(+process.env.ADMIN, error.message + "\n" + Path);
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
});

bot.on("callback_query", async (query) => {
  const callbackData = query.data;
  const userId = query.from.id;
  const messageId = query.message.message_id;
  try {
    if (callbackData === "accept") {
      Accept(bot, userId, messageId);
    }
    if (callbackData === "card") {
      await bot.copyMessage(
        userId,
        process.env.INFO_CHANEL_ID,
        +process.env.M_ID
      );
      await bot.deleteMessage(userId, messageId);
    }
    if (callbackData.split(" ")[0] === "cancel") {
      Cancel(bot, messageId, callbackData);
    }
    if (callbackData.split(" ")[0] === "vip" && userId === +process.env.ADMIN) {
      const fileId =
        query.message.photo[query.message.photo.length - 1].file_id;
      userPremium(bot, callbackData, fileId, messageId);
    }
  } catch (error) {
    const Path = import.meta.url;
    await bot.sendMessage(+process.env.ADMIN, error.message + "\n" + Path);
  }
});

bot.on("photo", (msg) => {
  const chatId = msg.chat.id;
  const photo = msg.photo[msg.photo.length - 1];
  const fileId = photo.file_id;

  mediaFile(bot, chatId, fileId, msg);

  // kod yozzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
});
