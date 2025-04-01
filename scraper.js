const puppeteer = require('puppeteer');

const pagesToScrape = [
  'https://sarsoor.org',         // עמוד הבית
  'https://www.sarsoor.org/#/apartmentForRent',  // עמוד המוצרים
  'https://www.sarsoor.org/#/apartmentForSale' ,     // עמוד הבלוג
  'https://www.sarsoor.org/#/apartmentHoliday'
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (let url of pagesToScrape) {
    await page.goto(url);
    await page.waitForSelector('body');  // המתן עד שהדף ייטען

    const content = await page.content();  // חילוץ התוכן של הדף
    console.log(`תוכן של הדף ${url}:`, content);  // הדפס את התוכן

    // אתה יכול גם לבצע משהו נוסף עם התוכן, כמו לשמור אותו לקובץ או לשלוח אותו למערכת אחרת
  }

  await browser.close();
})();
