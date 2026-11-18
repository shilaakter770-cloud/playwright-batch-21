
// import { test, expect } from '@playwright/test';

// import { SingUpPage } from '../pages/SingUpPage.js';

// test('page open', async ({ page }) => {
//   await page.goto('https://playwright.dev/');



// const SingUp = new SingUpPage(page);
// await SingUp.pageOpen();
// await SingUp.clickRegisterLink();
// await SingUp.fillFirstName('shila');
// await SingUp.clickGenderradioButton();
// } );





import { test, expect } from '@playwright/test';
import { SingUpPage } from '../pages/SingUpPage.js';

test('register for new user', async ({ page }) => {

  const SingUp = new SingUpPage(page);
  const email = `shila${Date.now()}@example.com`;

  await SingUp.pageOpen();
  await SingUp.clickRegisterLink();
  await page .waitForTimeout(2000); // Wait for 5 seconds to observe the result

  await SingUp.enterFirstName('shila');
  await SingUp.clickGenderradioButton();

  await SingUp.enterLastName('kumari');
  await page .waitForTimeout(2000);

  await SingUp.enterEmail(email);
  await SingUp.enterPassword('Password123');
  await SingUp.enterConfirmPassword('Password123');
  await page .waitForTimeout(2000);

  await SingUp.clickRegisterButton();
  await expect(SingUp.verifyLogin).toBeVisible();
  await page .waitForTimeout(2000);
   // Wait for 5 seconds to observe the result

// await  page.pause(); // Wait for 5 seconds to observe the result
});
