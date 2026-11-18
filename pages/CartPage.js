

import { Base } from './Base.js';

class CartPage extends Base {
  constructor(page) {
    super(page);

    this.cartLink = page.getByRole('link', {
      name: 'Shopping cart',
      exact: true
    });

    this.termsCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.locator('#checkout');
    this.removeFromCartCheckboxes = page.locator('input[name="removefromcart"]');
    this.updateCartButton = page.locator('input[name="updatecart"]');
    this.emptyCartMessage = page.getByText('Your Shopping Cart is empty!');
  }

  async openCart() {
    await this.clickElement(this.cartLink);
  }

  async agreeTerms() {
    await this.termsCheckbox.check();
  }

  async clickCheckout() {
    await this.clickElement(this.checkoutButton);
  }

  async clearCart() {
    const itemCount = await this.removeFromCartCheckboxes.count();

    for (let index = 0; index < itemCount; index += 1) {
      await this.removeFromCartCheckboxes.nth(index).check();
    }

    if (itemCount > 0) {
      await this.updateCartButton.click();
      await this.emptyCartMessage.waitFor({ state: 'visible' });
    }
  }
}

export { CartPage };
