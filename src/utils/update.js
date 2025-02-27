const update = (bot, msg) => {
  const chatId = msg.from.id;
  bot.sendMessage(chatId, JSON.stringify(msg, null, 2));
};

export default update;
