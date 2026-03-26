# 🎭 Playwright UI Automation Boilerplate - SauceDemo

A professional-grade, end-to-end (E2E) automation framework built with **Playwright** and **TypeScript**. This project serves as a showcase of scalable testing architecture, utilizing the **Page Object Model (POM)** and **Data-Driven Testing** methodologies to test the [SauceDemo](https://www.saucedemo.com/) e-commerce application.

---

## 🚀 Project Highlights

- **Page Object Model (POM):** Clean separation of test logic from UI locators to ensure high maintainability and readability.
- **Data-Driven Testing:** Externalized test data using `data.json` to handle multiple user personas and product sets without hardcoding.
- **Robust Selectors:** Utilization of `data-test` attributes and dynamic locators for resilient element identification.
- **Advanced Hooks:** Implementation of `beforeEach` and `afterEach` for efficient test setup and teardown.
- **Reporting:** Integrated HTML reporting with automatic screenshots and trace capturing on failure.

---

## 🛠️ Tech Stack

- **Framework:** [Playwright](https://playwright.dev/)
- **Language:** TypeScript
- **Test Runner:** Playwright Test
- **Environment:** Node.js

---

## 📂 Directory Structure

```text
.
├── src/
│   ├── pages/              # Page Object Classes
│   │   ├── LoginPage.ts
│   │   ├── InventoryPage.ts
│   │   └── CartPage.ts
│   ├── tests/              # Test Specifications
│   │   ├── login.spec.ts
│   │   └── inventory.spec.ts
│   └── test-data/          # External JSON Data
│       └── data.json
├── playwright.config.ts    # Global Configuration
├── package.json            # Scripts & Dependencies
└── README.md               # Documentation

📥 Getting Started
1. Prerequisites
Ensure you have Node.js (v18+) installed on your machine.
2. Installation
Clone the repository and install the dependencies:
Bash

git clone [https://github.com/t-rayan/qa-saucedemo-playwright.git](https://github.com/t-rayan/qa-saucedemo-playwright.git)
cd qa-saucedemo-playwright
npm install
3. Install Playwright Browsers
Bash

npx playwright install

🧪 Running Tests
Command	Action
npx playwright test	Runs all tests in headless mode
npx playwright test --ui	Opens the interactive UI Mode (Best for debugging)
npx playwright test --headed	Runs tests in a visible browser
npx playwright show-report	Opens the latest HTML test report
👤 About the Author
Narayan Thapa Aspiring QA Automation Engineer | BSc IT (Computing) 📍 Brisbane, Australia
I am a technical professional transitioning into Quality Assurance, with a strong background in software development (Next.js) and a passion for building robust automated testing solutions.

📄 License
This project is open-source and available under the MIT License.
