const puppeteer = require('puppeteer');

async function clickButton() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the website
  const navigationPromise = page.waitForNavigation(); // Wait for navigation to complete
  await page.goto('http://catalogo.info.unlp.edu.ar/meran/auth.pl');
  await navigationPromise; // Wait for navigation to complete

  // Fill in the input fields [usuario], [clave]
  await page.type('input[name="userid"]', 'usuario');
  await page.type('input[id="password_plain"]', 'clave');

  // Click the "Iniciar sesión" button
  await page.click('button[type="submit"]');

  // Wait for the button to be visible and interactable using XPath
  const buttonXPath = '/html/body/div[3]/div[2]/section/div[1]/div/a[2]';
  await page.waitForXPath(buttonXPath);

  // Click the button using XPath
  const [buttonElement] = await page.$x(buttonXPath);
  if (buttonElement) {
    await buttonElement.click();

    // Wait for the navigation to complete after clicking the button
    await page.waitForNavigation();

    // Get an array of all buttons with a certain type
    const buttons = await page.$$('.btn.btn-primary.click.click');
    if (buttons) {
      console.log('botones: ' + buttons.length);

      // Loop through the array and click each button
      for (const button of buttons) {
        await button.click();
      }
    }

  } else {
    console.log('Button not found.');
  }

  // Close the browser
  await browser.close();
}

clickButton();
