import "dotenv/config";
import express from "express";
import connectDB from "./config/database.js";
import "./bot/bot.js";
import "./bot/handler.js";
import unban from "./utils/cron.unban.js";
import notif from "./utils/cron.notif.js";

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
    console.log(error.message);
  }
};

boostrtap();

unban();

notif();
