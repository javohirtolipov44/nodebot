const keyb1 = [
  [{ text: "BATAFSIL MA'LUMOT", url: `${process.env.INFO_URL}` }],
  [{ text: "✅TO'LOV QILISH✅", callback_data: "accept" }],
];

const keyb2 = [[{ text: "KARTA RAQAMLARI", callback_data: "card" }]];

const keyb3 = (chatId) => [
  [{ text: "1-oy", callback_data: `vip ${chatId} 1` }],
  [{ text: "3-oy", callback_data: `vip ${chatId} 3` }],
  [{ text: "6-oy", callback_data: `vip ${chatId} 6` }],
  [{ text: "1-yil", callback_data: `vip ${chatId} 12` }],
  [{ text: "❌Bekor qilish❌", callback_data: `cancel ${chatId}` }],
  [{ text: "🚫Ban berish🚫", callback_data: `ban` }],
];

const keyb4 = [[{ text: "✅OBUNANI UZAYTIRISH✅", callback_data: "accept" }]];
const keyb5 = [[{ text: "✅OBUNA OLISH✅", callback_data: "accept" }]];

export { keyb1, keyb2, keyb3, keyb4, keyb5 };
