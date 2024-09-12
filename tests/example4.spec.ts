import { test, expect } from '@playwright/test';

// Setting up artifacts
test.use({
  screenshot: 'on',
  video: 'on-first-retry',
  trace: 'retain-on-failure',
});



// test('Visual Diff Test', async ({ page }) => {
//   await page.goto('https://playwright.dev');
  
//   // Capture and compare screenshot, forcing it to fail by setting a low maxDiffPixels
//   await expect(page).toHaveScreenshot({ maxDiffPixels: 0 }); // This will likely fail due to slight rendering differences
// });

// Define 50 tests
for (let i = 411; i <= 420; i++) {   
  test(`Test ${i}`, async ({ page }, testInfo) => {
    // Randomly skip some tests
    if (i % 7 === 0) {
      test.skip(`Skipping Test ${i}`);
    }

    // Intentionally fail some tests
    if (i % 5 === 0) {
      expect(true).toBe(false); // Intentional failure
    }

    // Introduce flaky behavior
    if (i % 8 === 0) {
      const randomFail = Math.random() > 0.5;
      if (randomFail) {
        expect(true).toBe(false); // Flaky failure
      }
    }

    // Example test cases
    await page.goto('https://example.com');

    // Capture screenshot artifact
    await page.screenshot({ path: `test${i}-screenshot.png` });

    // Basic interaction
    await expect(page).toHaveTitle(/Example Domain/);

    // Tracing interaction
    if (i === 10) {
      testInfo.attach('Trace for test 10', {
        body: await page.context().tracing.stop(),
        contentType: 'application/json',
      });
    }
  });
}
