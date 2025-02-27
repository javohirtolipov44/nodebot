import { keyb2 } from "../keyboard/inline.js";
import premiumModel from "../models/premiums.model.js";
import Io from "../utils/io.js";
import formatDate from "../utils/time.js";

const io = new Io();

const Accept = async (bot, userId, messageId) => {
  const OPTION = {
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: keyb2,
    },
  };
  const txt = `<b>Chekda aniq sana va vaqt, summa hamda o'tkazilgan karta raqam bo'lishi kerak!\n\n<i><u>Ps: bittadan ortiq rasm jo'natishga to'g'ri kelsa, donalab yuboring! Guruhlab yuborsangiz bot javob qaytarmaydi!</u></i></b>`;
  await bot.sendMessage(userId, txt, OPTION);
  await bot.deleteMessage(userId, messageId);
};

const Cancel = async (bot, messageId, callbackData) => {
  const id = +callbackData.split(" ")[1];

  const OPTION = {
    parse_mode: "HTML",
  };
  const txt = `<b>❌So'rovingiz rad etildi❌\n\nIltimos chekni tekshirib ko'ring</b>`;
  await bot.sendMessage(id, txt, OPTION);
  await bot.deleteMessage(process.env.ADMIN, messageId);
};

const userPremium = async (bot, callbackData, fileId, messageId) => {
  const id = +callbackData.split(" ")[1];
  const month = +callbackData.split(" ")[2];
  const premium = await premiumModel.findOne({ chatId: id });

  if (!premium) {
    const start = Date.now();
    let new_start = new Date(start);
    new_start.setMonth(new_start.getMonth() + month);
    const end = new_start.getTime();
    try {
      const result = await bot.approveChatJoinRequest(
        process.env.CHANEL_ID,
        id
      );

      if (result) {
        await premiumModel.create({
          chatId: id,
          start,
          end,
          file: fileId,
        });

        await bot.deleteMessage(process.env.ADMIN, messageId);
        const txt = `<b>tg://user?id=${id}\n<blockquote>Foydalanuvchi qo'shildi</blockquote>\nStart: ${formatDate(
          start
        )}\nEnd: ${formatDate(end)}</b>`;
        await bot.sendMessage(process.env.ADMIN, txt, { parse_mode: "HTML" });

        const txt2 = `<b><blockquote>Obuna muddati:</blockquote>\nStart: ${formatDate(
          start
        )}\nEnd: ${formatDate(end)}\n${process.env.PREMIUM}</b>`;
        await bot.sendMessage(id, txt2, { parse_mode: "HTML" });
      } else {
        await bot.sendMessage(
          process.env.ADMIN,
          "<b>❗❗Xatolik yuz berdi darhol dasturchiga xabar bering❗❗\nXatolik:callback.qury.js 57-qator</b>",
          { parse_mode: "HTML" }
        );
      }
    } catch (error) {
      if (
        error.message === "ETELEGRAM: 400 Bad Request: HIDE_REQUESTER_MISSING"
      ) {
        await bot.sendMessage(
          process.env.ADMIN,
          `tg://user?id=${id}\n❗Kanalga so'rov jo'natmagan❗`
        );
        await bot.sendMessage(
          id,
          `❗️Iltimos kanalga so'rov jo'nating❗️\n${process.env.PREMIUM}`
        );
      } else {
        await bot.sendMessage(
          process.env.ADMIN,
          `tg://user?id=${id}\n${error.message}`
        );
      }
    }
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

    await bot.deleteMessage(process.env.ADMIN, messageId);
    const txt = `<b>tg://user?id=${id}\n<blockquote>Obunasi uzaydi</blockquote>\nStart: ${formatDate(
      updatePremium.start
    )}\nEnd: ${formatDate(updatePremium.end)}</b>`;
    await bot.sendMessage(process.env.ADMIN, txt, { parse_mode: "HTML" });

    const txt2 = `<b><blockquote>Obuna muddati uzaydi:</blockquote>\nStart: ${formatDate(
      updatePremium.start
    )}\nEnd: ${formatDate(updatePremium.end)}\n${process.env.PREMIUM}</b>`;
    await bot.sendMessage(id, txt2, { parse_mode: "HTML" });
  }
};

export { Accept, userPremium, Cancel };
