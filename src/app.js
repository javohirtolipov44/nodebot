import "dotenv/config";
import express from "express";
import connectDB from "./config/database.js";
import "./bot/bot.js";
import "./bot/handler.js";
import Io from "./utils/io.js";
import bot from "./bot/bot.js";

const PORT = process.env.PORT || 8080;
const app = express();

const boostrtap = async () => {
  try {
    await connectDB();
    console.log("database connected");
    app.listen(PORT, () => {
      console.log("server is running:", PORT);
    });
  } catch (error) {
    // console.log(error.message);
  }
};

boostrtap();

const io = new Io();
const unban = async () => {
  setInterval(async () => {
    try {
      const premium = await io.readFile("premium.json"); // Premium foydalanuvchilar ro‘yxatini o‘qish
      const now = Date.now();
      console.log(now);

      // Muddati tugagan foydalanuvchilarni ajratib olish
      const expiredUsers = premium.filter((user) => user.end < now);
      const activeUsers = premium.filter((user) => user.end >= now);

      for (const user of expiredUsers) {
        try {
          await bot.unbanChatMember(process.env.CHANEL_ID, user.chatId); // Foydalanuvchini kanaldan chiqarish
          bot.sendMessage(
            process.env.ADMIN,
            `❌ ${user.chatId} kanaldan chiqarildi.`
          );
        } catch (error) {
          bot.sendMessage(
            process.env.ADMIN,
            `⚠️ Foydalanuvchini chiqarib bo‘lmadi: ${user.chatId}\n${error}`
          );
        }
      }

      // Yangilangan ro‘yxatni faylga yozish
      if (expiredUsers.length > 0) {
        await io.writeFile("premium.json", activeUsers);
      }
    } catch (error) {
      bot.sendMessage(
        process.env.ADMIN,
        "⚠️ Faylni o‘qishda yoki yozishda xatolik yuz berdi:"
      );
    }
  }, 15000);
};

unban(); // Funksiyani ishga tushirish
