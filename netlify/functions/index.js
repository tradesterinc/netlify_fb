const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");
const chromiumPlugin = require('netlify-plugin-chromium')
const exe


exports.handler = async (event, context) => {
  let browser;
  try {
    const executablePath = await chromiumPlugin.executablePath;
    browser = await puppeteer.launch({
      executablePath,
      args: chromium.args,
      headless: chromium.headless,
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
const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");

exports.handler = async (event, context) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: chromium.executablePath || process.env.CHROME_PATH,
      args: chromium.args,
      headless: chromium.headless,
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
      
