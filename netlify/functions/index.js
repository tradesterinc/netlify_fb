const puppeteer = require('puppeteer'); // Puppeteer standalone version

exports.handler = async (event, context) => {
  let browser;
  try {
    // Launch the browser
    browser = await puppeteer.launch({
      headless: true, // Ensure headless mode for serverless environments
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for serverless environments
    });

    const page = await browser.newPage();

    // Navigate to Facebook login page
    await page.goto('https://web.facebook.com/login', {
      waitUntil: 'networkidle2', // Ensure the page loads fully
    });

    // Perform actions
    await page.type('#email', 'salfordopera@gmail.com'); // Fill in email
    await page.type('#pass', 'Goldmedals@5');            // Fill in password
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
