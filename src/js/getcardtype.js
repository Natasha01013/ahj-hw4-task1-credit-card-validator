import {luhnCheck} from './luhncheck.js'

export function getCardType(cardNumber) {
  const cardTypes = [
    { type: "Visa", regex: /^4/ },
    { type: "MasterCard", regex: /^(5[1-5]|2[2-7])/ },
    { type: "American Express", regex: /^(34|37)/ },
    { type: "Discover", regex: /^(6011|622126|622925|64|65)/ },
    { type: "Мир", regex: /^220[0-4]/ },
  ];

  for (const card of cardTypes) {
    if (card.regex.test(cardNumber)) {
      return card.type;
    }
  }

  return "Неизвестная карта";
}
  
  document.getElementById('card-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const cardNumber = document.getElementById('card-number').value.replace(/\D/g, '');// удаление нецифровых символов
    const cardType = getCardType(cardNumber);
    const isValid = luhnCheck(cardNumber);
  
    document.getElementById('card-type').textContent = `Тип карты: ${cardType}`;
   
    // Динамическое отображение логотипа
    const cardLogos = document.querySelectorAll('.card-logo');
    cardLogos.forEach((logo) => {
      logo.style.opacity = 0.2;  // Делает остальные изображения полупрозрачными
    });
  
    const validCardLogo = Array.from(cardLogos).find((logo) => logo.alt.toLowerCase().includes(cardType.toLowerCase()));
    if (validCardLogo) validCardLogo.style.opacity = 1;  // Сделает соответствующую картинку видимой
  
    if (isValid) {
      document.getElementById('validity').textContent = "Номер карты действителен";
      console.log("Номер карты действителен");
    } else {
      document.getElementById('validity').textContent = "Неверный номер карты";
      console.log("Неверный номер карты");
    }
  });