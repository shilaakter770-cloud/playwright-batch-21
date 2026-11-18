
import { Base } from './Base.js';

class LoginPage extends Base {
  constructor(page) {
    super(page);

    this.loginLink = page.locator('a[href="/login"]');
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.locator('#Password');
    this.Checkbox = page.locator('#RememberMe');

    this.LoginButton = page.getByRole('button', { name: 'Log in' });

    // Q1 Locators
    this.verifyLogin = page.locator('a[href="/logout"]');
    this.errorMessage = page.locator('.validation-summary-errors');
  }

  async clickLoginLink() {
    await this.clickElement(this.loginLink);
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async RememberMeCheckbox() {
    await this.clickElement(this.Checkbox);
  }

  async clickLoginButton() {
    await this.clickElement(this.LoginButton);
  }
}

export { LoginPage };
