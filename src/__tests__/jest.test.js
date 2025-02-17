import {luhnCheck} from '../js/luhncheck.js'
import {getCardType} from '../js/getcardtype';

test('luhnCheck should validate card numbers', () => {
    expect(luhnCheck('4111111111111111')).toBe(true);  // валилная карта
    expect(luhnCheck('1234567890123456')).toBe(false); // невалидная карта
});

test('getCardType should detect card type correctly', () => {
    expect(getCardType('4111111111111111')).toBe('Visa');
    expect(getCardType('5105105105105100')).toBe('MasterCard');
    expect(getCardType('371449635398431')).toBe('American Express');
    expect(getCardType('6011514433546201')).toBe('Discover');
    expect(getCardType('2200202020202020')).toBe('Мир');
    expect(getCardType('0000202020202020')).toBe('Неизвестная карта');
});