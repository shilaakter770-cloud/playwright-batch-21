
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { getDemoShopCredentials } from '../test data/demoShopCredentials.js';
import { loginData } from '../test data/loginData.js';

// Valid Login
test('login for existing users', async ({ page }) => {
  const login = new LoginPage(page);
  const { email, password } = getDemoShopCredentials();

  await login.pageOpen();
  await login.clickLoginLink();
  await login.enterEmail(email);
  await login.enterPassword(password);
  await login.clickLoginButton();

  await expect(login.verifyLogin).toBeVisible();
});

// Q1: Invalid Login
test('Q1 Invalid Login', async ({ page }) => {
  const login = new LoginPage(page);

  await login.pageOpen();
  await login.clickLoginLink();

  await login.enterEmail(loginData[0].email);
  await login.enterPassword(loginData[0].password);

  await login.clickLoginButton();

  await expect(login.errorMessage).toBeVisible();
  await expect(login.verifyLogin).not.toBeVisible();
});
