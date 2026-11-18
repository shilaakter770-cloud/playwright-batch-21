# Demo Web Shop Automation

Playwright UI automation for the Tricentis Demo Web Shop, organized with Page
Object Model (POM). The tests use Chromium and the site at
`https://demowebshop.tricentis.com/`.

## Requirements

- Node.js LTS (20 or later)
- npm

## Setup

From the project root, install the dependencies and Chromium browser:

```powershell
npm ci
npx playwright install chromium
```

The valid-login and Q3 tests require an existing Demo Web Shop account. Set its
credentials as environment variables rather than putting them in source:

```powershell
$env:DEMO_SHOP_EMAIL = "your-account@example.com"
$env:DEMO_SHOP_PASSWORD = "your-password"
```

In GitHub, add repository secrets named `DEMO_SHOP_EMAIL` and
`DEMO_SHOP_PASSWORD` for the workflow.

## Run the tests

Run all UI tests sequentially:

```powershell
npx playwright test --workers=1
```

Run a single assignment scenario:

```powershell
# Q1: invalid login
npx playwright test tests/Login.test.js --grep "Q1 Invalid Login"

# Q2: registration
npx playwright test tests/SingUp.test.js

# Q2: add a product to the cart
npx playwright test tests/AddToCart.test.js

# Q3: product search through order details
npx playwright test tests/ProductSearch.test.js
```

Add `--headed` to any command to watch the test in a browser, for example:

```powershell
npx playwright test tests/ProductSearch.test.js --headed
```

The valid-login and Q3 tests use the environment credentials above. The
registration test generates a fresh email address for each run.

## Reports and screenshots

The Playwright HTML reporter runs with each test execution and writes its
report to `playwright-report/`. Open the latest report with:

```powershell
npx playwright show-report
```

The Allure reporter writes raw results to `allure-results/`. Generate and open
the Allure HTML report after running tests:

```powershell
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

Screenshots are configured to be captured on test failure and are available in
the test results and reports. Traces are collected on the first retry.

## Project layout

```text
pages/                 Page Object Model classes
tests/                 Playwright UI tests
test data/             Test data
.github/workflows/     GitHub Actions workflow
playwright.config.js   Playwright projects, reporters, and test settings
```

## Assignment coverage

| Assignment | Current implementation |
| --- | --- |
| Q1 Invalid Login | `tests/Login.test.js` |
| Q2 Register + Add Product to Cart | Registration and cart addition are in separate tests (`tests/SingUp.test.js` and `tests/AddToCart.test.js`); they are not yet one register-to-cart flow. |
| Q3 Product Search to Order Details | `tests/ProductSearch.test.js` logs in, searches, adds the configured quantity, checks out, and verifies order details. |

## Part B: GitHub workflow

The local history uses one branch per question, merged into `main`:

- `q1-invalid-login`
- `q2-register-add-to-cart`
- `q3-product-search-checkout`

The question branches contain incremental commits and are merged into `main`.
To publish the branches after GitHub access is available:

```powershell
git push -u origin main
git push -u origin q1-invalid-login
git push -u origin q2-register-add-to-cart
git push -u origin q3-product-search-checkout
```

The GitHub Actions workflow runs Playwright, generates both HTML reports, and
uploads the Playwright report, Allure results, and Allure report.
