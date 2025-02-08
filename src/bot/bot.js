import TelegramBot from "node-telegram-bot-api";
import commands from "../commands/commands.js";

const token = process.env.TOKEN;
const bot = new TelegramBot(token, {
  polling: true,
});

commands(bot);

export default bot;
