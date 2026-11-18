
import { Base } from './Base.js';

class ProductPage extends Base {
  constructor(page) {
    super(page);

    this.productLink = page.getByRole('link', {
  name: 'Create Your Own Jewelry',
  exact: true
});

    this.materialDropdown = page.locator('#product_attribute_71_9_15');
    this.lengthInput = page.locator('#product_attribute_71_10_16');
    this.pendantHeart = page.locator('#product_attribute_71_11_17_49');
    this.addToCartButton = page.locator('#add-to-cart-button-71');
    this.cartLink = page.getByRole('link', {
  name: 'Shopping cart',
  exact: true
});
  }

  async clickProduct() {
  await this.page.goto('https://demowebshop.tricentis.com/jewelry');
  await this.productLink.waitFor({ state: 'visible' });
  await this.productLink.click();
}

  async selectMaterial() {
    await this.materialDropdown.selectOption('45');
  }

  async enterLength(length) {
    await this.lengthInput.fill(length);
  }

  async selectPendant() {
    await this.pendantHeart.check();
  }

  async clickAddToCart() {
    await this.clickElement(this.addToCartButton);
  }

  async openCart() {
  await this.cartLink.click();
}
  }


export { ProductPage };
