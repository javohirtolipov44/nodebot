import "dotenv/config";
import express from "express";
import connectDB from "./config/database.js";
import "./bot/bot.js";
import "./bot/handler.js";

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
    console.error(error.message);
  }
};

boostrtap();
