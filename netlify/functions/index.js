
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");


exports.handler = async (event, context) => {
  let browser;
  try {
    const executablePath = await chromium.executablePath();
    browser = await puppeteer.launch({
      executablePath,
      args: chromium.args,
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto("https://example.com");

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Browser launched successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    if (browser) await browser.close();
  }
};
      
