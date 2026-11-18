
import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage.js';

test('Q2 Add Product to Cart', async ({ page }) => {

  const product = new ProductPage(page);

  await product.pageOpen();

  await product.clickProduct();

  // Select Product Options
  await product.selectMaterial();
  await product.enterLength('10');
  await product.selectPendant();

  // Add Product to Cart
  await product.clickAddToCart();
  await expect(page.locator('.bar-notification'))
    .toContainText('The product has been added to your shopping cart');

  // Open Shopping Cart
  await product.openCart();

  // Verify Product Added
  await expect(page.locator('.cart-item-row')).toHaveCount(1);
await expect(page.locator('.cart-item-row'))
  .toContainText('Create Your Own Jewelry');
});
