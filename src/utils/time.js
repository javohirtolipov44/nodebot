const formatDate = (timestamp) => {
  let date = new Date(timestamp);

  // Sana va vaqtni kerakli formatda chiqarish
  let day = String(date.getDate()).padStart(2, "0"); // Kun
  let month = String(date.getMonth() + 1).padStart(2, "0"); // Oy
  let year = date.getFullYear(); // Yil
  let hours = String(date.getHours()).padStart(2, "0"); // Soat
  let minutes = String(date.getMinutes()).padStart(2, "0"); // Daqiqa
  let seconds = String(date.getSeconds()).padStart(2, "0"); // Sekund

  // Formatta sanani chiqarish
  return `${day}.${month}.${year} Vaqt: <u>${hours}:${minutes}</u>`;
};

export default formatDate;
