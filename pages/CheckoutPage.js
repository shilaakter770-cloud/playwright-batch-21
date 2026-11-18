import { Base } from './Base.js';

class CheckoutPage extends Base {
  constructor(page) {
    super(page);

    this.billingAddressSelect = page.locator('#billing-address-select');
    this.billingFirstName = page.locator('#BillingNewAddress_FirstName');
    this.billingLastName = page.locator('#BillingNewAddress_LastName');
    this.billingEmail = page.locator('#BillingNewAddress_Email');
    this.billingCountry = page.locator('#BillingNewAddress_CountryId');
    this.billingStateProvince = page.locator('#BillingNewAddress_StateProvinceId');
    this.billingCity = page.locator('#BillingNewAddress_City');
    this.billingAddress1 = page.locator('#BillingNewAddress_Address1');
    this.billingZipCode = page.locator('#BillingNewAddress_ZipPostalCode');
    this.billingPhone = page.locator('#BillingNewAddress_PhoneNumber');

    this.shippingAddressSelect = page.locator('#shipping-address-select');
    this.shippingOptions = page.locator('input[name="shippingoption"]');
    this.paymentOptions = page.locator('input[name="paymentmethod"]');

    this.billingContinueButton = page.locator('input[onclick*="Billing.save"]');
    this.shippingContinueButton = page.locator('input[onclick*="Shipping.save"]');
    this.shippingMethodContinue = page.locator('input[onclick*="ShippingMethod.save"]');
    this.paymentMethodContinue = page.locator('input[onclick*="PaymentMethod.save"]');
    this.paymentInfoContinue = page.locator('input[onclick*="PaymentInfo.save"]');
    this.confirmOrderButton = page.locator('input[onclick*="ConfirmOrder"]');

    this.orderSuccessMessage = page.getByText(
      'Your order has been successfully processed!'
    );
    this.orderDetailsLink = page.getByRole('link', {
      name: 'Click here for order details.'
    });
  }

  async completeBilling() {
    if (await this.billingFirstName.isVisible()) {
      await this.billingFirstName.fill('Automation');
      await this.billingLastName.fill('User');
      await this.billingCountry.selectOption({ label: 'United States' });
      await this.billingStateProvince.selectOption({ label: 'New York' });
      await this.billingCity.fill('New York');
      await this.billingAddress1.fill('123 Test Street');
      await this.billingZipCode.fill('10001');
      await this.billingPhone.fill('5551234567');
    }

    await this.clickElement(this.billingContinueButton);
    await this.shippingAddressSelect.waitFor({ state: 'visible' });
  }

  async completeShipping() {
    await this.clickElement(this.shippingContinueButton);
    await this.shippingOptions.first().waitFor({ state: 'visible' });
  }

  async completeShippingMethod() {
    await this.shippingOptions.first().check();
    await this.clickElement(this.shippingMethodContinue);
    await this.paymentOptions.first().waitFor({ state: 'visible' });
  }

  async completePaymentMethod() {
    await this.paymentOptions.first().check();
    await this.clickElement(this.paymentMethodContinue);
    await this.paymentInfoContinue.waitFor({ state: 'visible' });
  }

  async completePaymentInfo() {
    await this.clickElement(this.paymentInfoContinue);
    await this.confirmOrderButton.waitFor({ state: 'visible' });
  }

  async confirmOrder() {
    await this.clickElement(this.confirmOrderButton);
    await this.orderSuccessMessage.waitFor({ state: 'visible' });
  }

  async verifyOrderSuccess() {
    await this.orderSuccessMessage.waitFor({ state: 'visible' });
  }

  async viewOrderDetails() {
    await this.clickElement(this.orderDetailsLink);
  }
}

export { CheckoutPage };
