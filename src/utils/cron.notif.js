import bot from "../bot/bot.js";
import { keyb4 } from "../keyboard/inline.js";
import premiumModel from "../models/premiums.model.js";
import cron from "node-cron";

const notif = () => {
  cron.schedule("57 12 * * *", async () => {
    try {
      const now = new Date();
      now.setUTCHours(0, 0, 0, 0);

      const threeDaysLater = new Date(now);
      threeDaysLater.setUTCDate(now.getUTCDate() + 3);

      const nextDay = new Date(threeDaysLater);
      nextDay.setUTCDate(threeDaysLater.getUTCDate() + 1);

      const results = await premiumModel.find({
        end: {
          $gte: threeDaysLater,
          $lt: nextDay,
        },
      });
      const ids = results.map((user) => user.chatId);
      for (const chatid of ids) {
        await bot.sendMessage(
          chatid,
          `<b><blockquote>❗❗❗Eslatma❗❗❗</blockquote>\n\n3 kundan so'ng obuna tugaydi\n</b>`,
          {
            parse_mode: "HTML",
            disable_web_page_preview: true,
            reply_markup: {
              inline_keyboard: keyb4,
            },
          }
        );
      }
    } catch (error) {
      bot.sendMessage(
        process.env.ADMIN,
        `Xatolik:cron.notif.js\n` + error.message
      );
    }
  });
};

export default notif;
