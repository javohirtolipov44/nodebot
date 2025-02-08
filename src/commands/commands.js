function commands(bot) {
  const commands = [
    {
      command: "start",
      description: "Qayta ishga tushirish",
    },
    {
      command: "referal",
      description: "Obunachi toplash",
    },
    {
      command: "info",
      description: "Yordam",
    },
  ];

  return bot.setMyCommands(commands);
}

export default commands;
