const chromium = require('@sparticuz/chromium'); // Provided by Netlify's Chromium plugin
const playwright = require('playwright-core');  // Use 'playwright-core' for custom binaries

exports.handler = async (event, context) => {
  let browser;
  try {
    // Launch the browser using Chromium plugin
    browser = await playwright.chromium.launch({
      executablePath: await chromium.executablePath, // Chromium binary provided by the plugin
      args: chromium.args,
      headless: chromium.headless, // Headless mode for serverless
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to Facebook login page
    await page.goto('https://web.facebook.com/login');

    // Perform actions
    await page.fill('#email', 'salfordopera@gmail.com');
    await page.fill('#pass', 'Goldmedals@5');
    await page.click('button[name="login"]');
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
