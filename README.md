# Playwright Web and API Automation Framework

[![Playwright Tests](https://github.com/YazanAbzakh/playwright-automation-assessment/actions/workflows/playwright.yml/badge.svg)](https://github.com/YazanAbzakh/playwright-automation-assessment/actions/workflows/playwright.yml)

## 1. Project Description

This repository contains a scalable Playwright automation framework built with TypeScript. It automates SauceDemo web UI scenarios across Google Chrome and Firefox, together with the complete Simple Books API order lifecycle.

The framework uses Page Object Model, custom Playwright fixtures, external JSON test data, a reusable API client, dynamic test utilities, HTML reporting, and GitHub Actions continuous integration.

### Test Applications

- **Web UI:** https://www.saucedemo.com/
- **API:** https://simple-books-api.click

## 2. Prerequisites

The framework was developed and validated using:

- Node.js 24.13.1
- npm 11.8.0
- Playwright 1.61.1
- TypeScript 7.0.2
- Git
- Google Chrome

Playwright installs and manages its compatible Firefox browser build.

## 3. Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YazanAbzakh/playwright-automation-assessment.git
   ```

2. Navigate to the project folder:

   ```bash
   cd playwright-automation-assessment
   ```

3. Install the exact dependency versions from `package-lock.json`:

   ```bash
   npm ci
   ```

4. Install Google Chrome and Firefox for Playwright:

   ```bash
   npx playwright install chrome firefox
   ```

5. Validate the TypeScript project:

   ```bash
   npm run typecheck
   ```

## 4. Running Tests

### Run the complete UI and API suite

```bash
npm test
```

### Run UI tests only in Google Chrome and Firefox

```bash
npm run test:ui
```

### Run API tests only

```bash
npm run test:api
```

### Run UI and API tests together

```bash
npm test
```

### Run UI tests in headed mode

```bash
npm run test:headed
```

### Run TypeScript validation

```bash
npm run typecheck
```

## 5. Architecture and Project Structure

The framework separates test scenarios, page interactions, API communication, fixtures, test data, and reusable utilities.

```text
playwright-automation-assessment/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── src/
│   ├── api/
│   │   └── SimpleBooksApi.ts
│   ├── data/
│   │   ├── api-test-data.json
│   │   └── ui-test-data.json
│   ├── fixtures/
│   │   └── testFixtures.ts
│   ├── pages/
│   │   ├── CartPage.ts
│   │   ├── CheckoutCompletePage.ts
│   │   ├── CheckoutPage.ts
│   │   ├── LoginPage.ts
│   │   └── ProductsPage.ts
│   └── utils/
│       └── randomData.ts
├── tests/
│   ├── api/
│   │   └── orders.spec.ts
│   └── ui/
│       ├── checkout.spec.ts
│       ├── login.spec.ts
│       └── products.spec.ts
├── reports/
│   └── .gitkeep
├── global-setup.ts
├── global-teardown.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### Architectural Pattern

The UI automation layer uses Page Object Model. Each SauceDemo page has a dedicated class containing its locators and reusable page interactions.

The API layer uses a reusable client class that centralizes endpoints, authorization headers, request methods, and request payload construction.

Custom Playwright fixtures construct and inject page objects and the API client into tests. This removes repeated setup and keeps test files focused on scenarios and assertions.

External JSON files separate stable test values from test behavior. Dynamic values, such as unique API client email addresses, are generated through reusable utilities.

### Folder Responsibilities

| Path | Responsibility |
|---|---|
| `src/pages` | Page Object Model classes for SauceDemo screens |
| `src/api` | Reusable Simple Books API request client |
| `src/fixtures` | Custom Playwright fixture definitions |
| `src/data` | External JSON data for UI and API tests |
| `src/utils` | Shared utilities such as unique email generation |
| `tests/ui` | SauceDemo UI test scenarios and assertions |
| `tests/api` | Simple Books API lifecycle tests and assertions |
| `reports/html` | Generated Playwright HTML report |
| `.github/workflows` | GitHub Actions CI workflow |

## 6. Automated UI Test Scenarios

| Test Case | Module | Test Name | Main Verification |
|---|---|---|---|
| TC_UI_001 | Login | Valid Login | Valid user reaches the Products page |
| TC_UI_002 | Login | Data-Driven Invalid Login Validation | Required-field and invalid-credential errors are displayed |
| TC_UI_003 | Products | Products Sorted Z to A | Displayed product order matches reverse-alphabetical sorting |
| TC_UI_004 | Checkout | End-to-End Checkout Flow | Two most expensive products are selected dynamically, subtotal is correct, and the order completes |

TC_UI_002 contains three independently reported datasets:

- No Username
- No Password
- Invalid Credentials

All UI scenarios execute in both Google Chrome and Firefox.

## 7. Automated API Test Scenarios

| Test Case | Module | Test Name | Main Verification |
|---|---|---|---|
| TC_API_001 | Authentication / Orders | Authenticate Client and Create Order | Client receives a token and order creation returns `201` with an `orderId` |
| TC_API_002 | Orders | Retrieve Created Order | GET returns `200` and the original book and customer values |
| TC_API_003 | Orders | Update Existing Order | PATCH returns `204` and GET confirms the updated customer name |
| TC_API_004 | Orders | Delete Existing Order | DELETE returns `204` and the follow-up GET returns `404` |

The API scenarios execute serially because they intentionally represent one connected order lifecycle:

```text
Create → Retrieve → Update → Delete
```

## 8. Viewing Reports

Playwright generates the HTML report inside:

```text
reports/html
```

After a test run, open the report with:

```bash
npm run report
```

The report includes:

- Passed and failed test results
- Browser project names
- Execution durations
- Error details
- Screenshots retained on failure
- Videos retained on failure
- Traces retained on failure

Press `Ctrl + C` in the terminal to stop the local report server.

## 9. CI/CD

The GitHub Actions workflow is located at:

```text
.github/workflows/playwright.yml
```

The workflow:

1. Checks out the repository.
2. Configures Node.js 24.13.1.
3. Installs dependencies with `npm ci`.
4. Installs Google Chrome, Firefox, and required Linux dependencies.
5. Runs TypeScript validation.
6. Runs the complete UI and API suite headlessly.
7. Uploads the Playwright HTML report as an artifact.

### Workflow Triggers

The workflow runs:

- Whenever code is pushed or merged into the `main` branch.
- Every day at exactly 3:00 AM using the `Asia/Amman` timezone.

### Downloading the CI Report

1. Open the repository on GitHub.
2. Open the **Actions** tab.
3. Select a completed Playwright workflow run.
4. Scroll to the **Artifacts** section.
5. Download `playwright-html-report`.

## Framework Features

- Playwright with TypeScript
- Page Object Model
- Custom Playwright fixtures
- External JSON test data
- Data-driven invalid-login execution
- Dynamic selection of the two most expensive products
- Mathematical checkout subtotal validation
- Playwright native API testing
- Dynamic unique email generation
- Google Chrome and Firefox execution
- Global suite start and finish logging
- Screenshots, videos, and traces retained on failure
- HTML test reporting
- GitHub Actions continuous integration
- Daily scheduled execution at 3:00 AM Amman time

