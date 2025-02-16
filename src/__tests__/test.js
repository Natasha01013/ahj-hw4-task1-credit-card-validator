const puppeteer = require('puppeteer');

describe('testing the widget', () => {
  let browser;
  let page;

  beforeAll(async () => {
    // Запускаем браузер
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    // Открываем страницу с виджетом
    await page.goto('http://localhost:9000'); 
  });

  afterAll(async () => {
    await browser.close();
  });

  it('checking card Visa', async () => {
    await page.type('#card-number', '4111111111111111'); // Вводим номер карты Visa
    await page.click('button'); // Нажимаем на кнопку

    // Проверяем, что отображается правильная платёжная система
    const cardType = await page.$eval('#card-type', el => el.textContent);
    expect(cardType).toContain('Visa');

    // Проверяем, что карта валидна
    const validityMessage = await page.$eval('#validity', el => el.textContent);
    expect(validityMessage).toContain('Номер карты валиден.');

    // Проверяем отображение логотипа
    const logoSrc = await page.$eval('#card-logo', el => el.getAttribute('src'));
    expect(logoSrc).toContain('visa.png');
  });

  it('checking card MasterCard', async () => {
    await page.type('#card-number', '5111111111111111'); // Вводим номер карты MasterCard
    await page.click('button'); // Нажимаем на кнопку

    // Проверяем, что отображается правильная платёжная система
    const cardType = await page.$eval('#card-type', el => el.textContent);
    expect(cardType).toContain('MasterCard');

    // Проверяем, что карта валидна
    const validityMessage = await page.$eval('#validity', el => el.textContent);
    expect(validityMessage).toContain('Номер карты валиден.');

    // Проверяем отображение логотипа
    const logoSrc = await page.$eval('#card-logo', el => el.getAttribute('src'));
    expect(logoSrc).toContain('mastercard.png');
  });

  it('checking an invalid card', async () => {
    await page.type('#card-number', '4111111111111121'); // Вводим невалидный номер карты
    await page.click('button'); // Нажимаем на кнопку

    // Проверяем, что система сообщает о невалидности
    const validityMessage = await page.$eval('#validity', el => el.textContent);
    expect(validityMessage).toContain('Номер карты невалиден.');

    // Логотип не должен отображаться
    const logoSrc = await page.$eval('#card-logo', el => el.getAttribute('src'));
    expect(logoSrc).toBe('');
  });

  it('checking card МИР', async () => {
    await page.type('#card-number', '2200123456789012'); // Вводим номер карты МИР
    await page.click('button'); // Нажимаем на кнопку

    // Проверяем, что отображается правильная платёжная система
    const cardType = await page.$eval('#card-type', el => el.textContent);
    expect(cardType).toContain('МИР');

    // Проверяем, что карта валидна
    const validityMessage = await page.$eval('#validity', el => el.textContent);
    expect(validityMessage).toContain('Номер карты валиден.');

    // Проверяем отображение логотипа
    const logoSrc = await page.$eval('#card-logo', el => el.getAttribute('src'));
    expect(logoSrc).toContain('mir.png');
  });
});