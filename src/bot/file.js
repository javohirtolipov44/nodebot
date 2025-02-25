import { keyb3 } from "../keyboard/inline.js";
import premiumModel from "../models/premiums.model.js";
import userModel from "../models/users.model.js";
import formatDate from "../utils/time.js";

const mediaFile = async (bot, chatId, fileId, msg) => {
  const checkUser = await userModel.findOne({ chatId });
  const checkPremium = await premiumModel.findOne({ chatId });
  const username = msg.from.username || "";
  if (checkUser) {
    await userModel.updateOne({ chatId }, { file: fileId });
  } else {
    await userModel.create({
      chatId,
      created: Date.now(),
      username,
      file: fileId,
    });
  }
  let txt = ``;
  if (checkPremium) {
    txt = `<blockquote><b>Obunani yangilash:\ntg://user?id=${chatId}\nUsername: @${username}\nEski obuna:\nStart: ${formatDate(
      checkPremium.start
    )}\nEnd: ${formatDate(checkPremium.end)}</b></blockquote>`;
  } else {
    txt = `<blockquote><b>Yangi obuna:\ntg://user?id=${chatId}\nUsername: @${username}</b></blockquote>`;
  }
  bot.sendPhoto(process.env.ADMIN, fileId, {
    parse_mode: "HTML",
    caption: txt,
    reply_markup: {
      inline_keyboard: keyb3(chatId),
    },
  });

  const text = `Tez orada so'rovingizga javob beramiz!\n\nTushunmovchiliklarni oldini olish maqsadida PREMIUM Kanalga so'rov yuborganingizni yana bir bor tekshirib ko'rishingizni so'raymiz!\n\n${process.env.PREMIUM}`;
  bot.sendMessage(chatId, text);
};

export default mediaFile;
