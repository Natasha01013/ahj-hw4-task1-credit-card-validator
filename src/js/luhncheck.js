//Функция для проверки валидности номера карты
// используется алгоритм Луна (Luhn's Algorithm), который позволяет определить, 
// является ли номер карты правильным.
// Алгоритм:
// Начинайте с последней цифры, удваивайте каждую вторую цифру.
// Если удвоенная цифра больше 9, вычитайте 9 из нее.
// Сложите все цифры.
// Если сумма делится на 10, номер карты действителен.
export function luhnCheck(cardNumber) {
    let sum = 0;
    let shouldDouble = false;
  
    // Проходим по всем цифрам карты с конца
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber[i]);
  
      if (shouldDouble) {
        digit *= 2; // Начинаем с последней цифры и если позиция нечётная, удваиваем цифру.
        if (digit > 9) { //Если удвоенная цифра больше 9, вычитаем 9 из нее.
          digit -= 9;
        }
      }
  
      sum += digit; // Складываем все цифры.
      shouldDouble = !shouldDouble;
    }
  
    return sum % 10 === 0; //Если сумма делится на 10, номер карты действителен.
  }