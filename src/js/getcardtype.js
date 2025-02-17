export function getCardType(cardNumber) {
  const cardTypes = [
    { type: "Visa", regex: /^4/ },
    { type: "MasterCard", regex: /^(5[1-5]|22[2-7])/ },
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