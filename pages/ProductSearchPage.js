
import { Base } from './Base.js';

class ProductSearchPage extends Base {
  constructor(page) {
    super(page);

    // Product Search Locators
    this.searchInput = page.locator('#small-searchterms');
    this.searchButton = page.locator('.search-box-button');
    this.hdd320 = this.page.getByLabel('320 GB');

    // Product Locator
    this.productLink = page.getByRole('link', {
      name: 'Build your own computer',
      exact: true
    });

    // Quantity Locator
    this.quantityInput = page.locator(
      'input[id^="addtocart_"][id$="_EnteredQuantity"]'
    );

    // Add to Cart
    this.addToCartButton = page.locator(
      '#product-details-form .add-to-cart-button'
    );
  }

  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.clickElement(this.searchButton);
  }

  async verifyProduct() {
    await this.productLink.waitFor({ state: 'visible' });
  }

  async clickProduct() {
    await this.clickElement(this.productLink);
  }
async selectHDD() {
    await this.hdd320.check();
}


  async increaseQuantity(quantity) {
    await this.quantityInput.fill(String(quantity));
  }

  async clickAddToCart() {
    await this.clickElement(this.addToCartButton);
  }
}

export { ProductSearchPage };
