const chromium = require('@sparticuz/chromium'); // Provided by Netlify's Chromium plugin
const puppeteer = require('puppeteer-core'); // Use 'puppeteer-core' for custom binaries

exports.handler = async (event, context) => {
  let browser;
  try {
    // Launch the browser using Chromium plugin
    browser = await puppeteer.launch({
      executablePath: process.env.CHROME_PATH || await chromium.executablePath, // Chromium binary provided by the plugin
      args: chromium.args,
      headless: true, // Headless mode for serverless
    });

    const page = await browser.newPage();

    // Navigate to Facebook login page
    await page.goto('https://web.facebook.com/login');

    // Perform actions
    await page.type('#email', 'salfordopera@gmail.com'); // Fill email field
    await page.type('#pass', 'Goldmedals@5');            // Fill password field
    await page.click('button[name="login"]');            // Click login button
    await page.waitForNavigation();

    const currentURL = page.url();

    // Return result
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: !currentURL.includes('failure'),
        url: currentURL,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
