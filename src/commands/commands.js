function commands(bot) {
  const commands = [
    {
      command: "start",
      description: "Qayta ishga tushirish",
    },
    {
      command: "info",
      description: "Yordam",
    },
  ];

  return bot.setMyCommands(commands);
}

export default commands;
