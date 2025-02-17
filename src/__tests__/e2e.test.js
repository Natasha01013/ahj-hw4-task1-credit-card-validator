const puppeteer = require('puppeteer');

test('should display correct card logo and validity message', async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('http://localhost:9000'); 

    // Заполнение номера карты и отправка формы
    await page.type('#card-number', '4111111111111111');
    await page.click('button[type="submit"]');

    // Ожидание появления нужных элементов на странице
    await page.waitForSelector('#card-type');
    await page.waitForSelector('#validity'); 
    
    // Проверка текста на странице
    const cardType = await page.$eval('#card-type', el => el.textContent);
    const validity = await page.$eval('#validity', el => el.textContent);

    // Ожидаемые значения
    expect(cardType).toContain('Visa');
    expect(validity).toContain('Номер карты валиден');

    await browser.close();
});