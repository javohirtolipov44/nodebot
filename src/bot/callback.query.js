import { keyb2 } from "../keyboard/inline.js";
import premiumModel from "../models/premiums.model.js";
import Io from "../utils/io.js";
import formatDate from "../utils/time.js";

const io = new Io();

const Accept = (bot, userId) => {
  const OPTION = {
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: keyb2,
    },
  };
  const txt = `<b>Chekda aniq sana va vaqt, summa hamda o'tkazilgan karta raqam bo'lishi kerak!\n\n<i><u>Ps: bittadan ortiq rasm jo'natishga to'g'ri kelsa, donalab yuboring! Guruhlab yuborsangiz bot javob qaytarmaydi!</u></i></b>`;
  bot.sendMessage(userId, txt, OPTION);
};

const userPremium = async (bot, callbackData, fileId, userId, messageId) => {
  const id = +callbackData.split(" ")[1];
  const month = +callbackData.split(" ")[2];
  const premium = await premiumModel.findOne({ chatId: id });

  if (!premium) {
    const start = Date.now();
    let new_start = new Date(start);
    new_start.setMonth(new_start.getMonth() + month);
    const end = new_start.getTime();
    await premiumModel.create({
      chatId: id,
      start,
      end,
      file: fileId,
    });
    const result = await bot.approveChatJoinRequest(process.env.CHANEL_ID, id);
    console.log(result);

    await bot.deleteMessage(userId, messageId);
    const txt = `<b>tg://user?id=${id}\n<blockquote>Foydalanuvchi qo'shildi</blockquote>\nStart: ${formatDate(
      start
    )}\nEnd: ${formatDate(end)}</b>`;
    await bot.sendMessage(userId, txt, { parse_mode: "HTML" });
  } else {
    let new_start = new Date(premium.end);

    new_start.setMonth(new_start.getMonth() + month);
    const end = new_start.getTime();
    const updatePremium = await premiumModel.findOneAndUpdate(
      { chatId: id },
      {
        start: premium.end,
        end,
        file: fileId,
      },
      { new: true }
    );
    try {
      const result = await bot.approveChatJoinRequest(
        process.env.CHANEL_ID,
        id
      );
      console.log(result);
    } catch (error) {
      console.log(error.response.message);
      console.log("xatolik");
    }
    await bot.deleteMessage(userId, messageId);
    const txt = `<b>tg://user?id=${id}\n<blockquote>Foydalanuvchi qo'shildi</blockquote>\nStart: ${formatDate(
      updatePremium.start
    )}\nEnd: ${formatDate(updatePremium.end)}</b>`;
    await bot.sendMessage(userId, txt, { parse_mode: "HTML" });
  }
};

export { Accept, userPremium };
