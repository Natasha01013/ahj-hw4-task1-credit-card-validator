import './style.css'; 
import {luhnCheck} from './js/luhncheck.js'
import {getCardType} from './js/getcardtype';

document.getElementById('card-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const cardNumber = document.getElementById('card-number').value.replace(/\D/g, '');// удаление нецифровых символов
    const cardType = getCardType(cardNumber);
    const isValid = luhnCheck(cardNumber);
  
    document.getElementById('card-type').textContent = `Тип карты: ${cardType}`;
   
    //Отображение логотипа
    const cardLogos = document.querySelectorAll('.card-logo');
    cardLogos.forEach((logo) => {
      logo.style.opacity = 0.2;  // Делает остальные изображения полупрозрачными
    });
  
    //В зависимости от атрибута alt будем искать нужный логотип карты
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