export function getDemoShopCredentials() {
  const email = process.env.DEMO_SHOP_EMAIL;
  const password = process.env.DEMO_SHOP_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'Set DEMO_SHOP_EMAIL and DEMO_SHOP_PASSWORD to run authenticated tests.'
    );
  }

  return { email, password };
}
