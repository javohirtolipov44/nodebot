import { keyb2 } from "../keyboard/inline.js";

const Accept = async (bot, userId) => {
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

export { Accept };
