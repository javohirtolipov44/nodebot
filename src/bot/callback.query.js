import { keyb2 } from "../keyboard/inline.js";
import Io from "../utils/io.js";

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

const userPremium = async (bot, callbackData) => {
  const id = callbackData.split(" ")[1];
  const month = callbackData.split(" ")[2];
  const premiums = await io.readFile("premium.json");
  const premium = premiums.find((value) => value.chatId === id);

  if (!premium) {
    const start = Date.now();
    let new_start = new Date(start);
    new_start.setMonth(new_start.getMonth() + month);
    const end = new_start.getTime();
    premiums.push({
      chatId: id,
      start,
      end,
      file: "",
    });

    await io.writeFile("premium.json", premiums);
    // bot.sendMessage(chatId, text, OPTION);
  } else {
    let new_start = new Date(premium.end);
    console.log(new_start);
    new_start.setMonth(new_start.getMonth() + month);
    const end = new_start.getTime();
    premium.start = premium.end;
    premium.end = end;
    await io.writeFile("premium.json", premiums);
  }
};

export { Accept, userPremium };
