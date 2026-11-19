// Browser tests: open the real page and click it like a person would.
// Run with: npm run test:e2e
const { test, expect } = require('@playwright/test');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const pageUrl = pathToFileURL(path.join(__dirname, '../../app/index.html')).href;

test.beforeEach(async ({ page }) => {
  await page.goto(pageUrl);
});

test('opens with the example bill at 15%', async ({ page }) => {
  await expect(page.locator('#amount')).toHaveValue('48.60');
  await expect(page.locator('#tip15')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#tipValue')).toHaveValue('$7.29');
  await expect(page.locator('#total')).toHaveText('$55.89');
});

test('typing a new amount updates the tip and total', async ({ page }) => {
  await page.fill('#amount', '100');
  await expect(page.locator('#tipValue')).toHaveValue('$15.00');
  await expect(page.locator('#total')).toHaveText('$115.00');
});

for (const [button, tip, total] of [
  ['#tip10', '$10.00', '$110.00'],
  ['#tip15', '$15.00', '$115.00'],
  ['#tip20', '$20.00', '$120.00'],
]) {
  test(`clicking ${button} on a $100 bill shows ${tip}`, async ({ page }) => {
    await page.fill('#amount', '100');
    await page.click(button);
    await expect(page.locator(button)).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#tipValue')).toHaveValue(tip);
    await expect(page.locator('#total')).toHaveText(total);
  });
}

test('only one tip button is selected at a time', async ({ page }) => {
  await page.click('#tip20');
  await expect(page.locator('.tips button[aria-pressed="true"]')).toHaveCount(1);
});

test('clearing the amount shows $0.00', async ({ page }) => {
  await page.fill('#amount', '');
  await expect(page.locator('#tipValue')).toHaveValue('$0.00');
  await expect(page.locator('#total')).toHaveText('$0.00');
});
