
import { test, expect } from '@playwright/test';
import { ProductSearchPage } from '../pages/ProductSearchPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { getDemoShopCredentials } from '../test data/demoShopCredentials.js';

test('Q3 Product Search to Order Confirmation E2E', async ({ page }) => {

  const product = new ProductSearchPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);
  const login = new LoginPage(page);
  const { email, password } = getDemoShopCredentials();

  // 1. Open Website
  await product.pageOpen();

  // 2. Log in
  await login.clickLoginLink();
  await login.enterEmail(email);
  await login.enterPassword(password);
  await login.clickLoginButton();
  await expect(login.verifyLogin).toBeVisible();

  // 3. Start with an empty cart
  await cart.openCart();
  await cart.clearCart();

  // 4. Search Product
  await product.searchProduct('computer');

  // 5. Verify Product
  await product.verifyProduct();

  // 6. Open Product
  await product.clickProduct();

  // 7. Increase Quantity
  await product.increaseQuantity(2);

  await product.selectHDD();

  // 8. Add to Cart
  await product.clickAddToCart();
  await expect(page.locator('.bar-notification'))
    .toContainText('The product has been added to your shopping cart');

  // 9. Open Cart
  await cart.openCart();
  await expect(page.locator('.cart-item-row')).toHaveCount(1);

  // 10. Agree Terms
  await cart.agreeTerms();

  // 11. Complete Checkout
  await cart.clickCheckout();
  await checkout.completeBilling();
  await checkout.completeShipping();
  await checkout.completeShippingMethod();
  await checkout.completePaymentMethod();
  await checkout.completePaymentInfo();
  await checkout.confirmOrder();
  await checkout.viewOrderDetails();

  await expect(page.getByText(/Order #\d+/)).toBeVisible();
  await expect(page.getByText('Pending')).toBeVisible();
  await expect(page.getByText('Build your own computer')).toBeVisible();
  await expect(page.locator('.order-overview .order-total strong')).toHaveText('2537.00');
});
