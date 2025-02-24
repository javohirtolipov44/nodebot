const keyb1 = [
  [{ text: "BATAFSIL MA'LUMOT", url: `${process.env.INFO_URL}` }],
  [{ text: "✅TO'LOV QILISH✅", callback_data: "accept" }],
];

const keyb2 = [[{ text: "KARTA RAQAMLARI", url: `${process.env.INFO_URL}` }]];

const keyb3 = (chatId) => [
  [{ text: "1-oy", callback_data: `vip ${chatId} 1` }],
  [{ text: "3-oy", callback_data: `vip ${chatId} 3` }],
  [{ text: "6-oy", callback_data: `vip ${chatId} 6` }],
  [{ text: "1-yil", callback_data: `vip ${chatId} 12` }],
  [{ text: "❌Bekor qilish❌", callback_data: `cancel` }],
  [{ text: "🚫Ban berish🚫", callback_data: `ban` }],
];

export { keyb1, keyb2, keyb3 };
