import bot from "../bot/bot.js";
import { keyb5 } from "../keyboard/inline.js";
import premiumModel from "../models/premiums.model.js";
import formatDate from "./time.js";
import cron from "node-cron";

const unban = () => {
  cron.schedule("*/10 * * * * *", async () => {
    const now = new Date();

    try {
      const deletedSubscriber = await premiumModel.findOneAndDelete({
        end: { $lt: now },
      });
      if (deletedSubscriber) {
        const result = await bot.unbanChatMember(
          process.env.CHANEL_ID,
          deletedSubscriber.chatId
        );
        if (result) {
          await bot.sendMessage(
            process.env.ADMIN,
            `<b>tg://user?id=${
              deletedSubscriber.chatId
            } id o'chirildi\n\nStart: ${formatDate(
              deletedSubscriber.start
            )}\nEnd: ${formatDate(deletedSubscriber.end)}</b>`,
            { parse_mode: "HTML" }
          );
          await bot.sendMessage(
            deletedSubscriber.chatId,
            `<b>❗Obuna muddati tugadi❗\n\nAvvalgi obuna:\nStart: ${formatDate(
              deletedSubscriber.start
            )}\nEnd: ${formatDate(deletedSubscriber.end)}\n\n${
              process.env.PREMIUM
            }</b>`,
            {
              parse_mode: "HTML",
              disable_web_page_preview: true,
              reply_markup: {
                inline_keyboard: keyb5,
              },
            }
          );
        }
      }
    } catch (error) {
      bot.sendMessage(
        process.env.ADMIN,
        `tg://user?id=${deletedSubscriber.chatId}\nObunachini o'chirishda xatolik:` +
          error.message
      );
    }
  });
};

export default unban;
