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
for (let i = 421; i <= 820; i++) {
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

// // Define 25 tests
// for (let i = 1; i <= 25; i++) {
//   test(`Error Category Test ${i}`, async ({ page }, testInfo) => {
//     // Randomly skip some tests
//     if (i % 4 === 0) {
//       test.skip(`Skipping Error Category Test ${i}`);
//     }

//     // Intentionally fail some tests based on element interaction
//     if (i % 6 === 0) {
//       await page.goto('https://example.com/non-existent-page');
//       await expect(page).toHaveTitle(/404/); // Intentional failure if the title doesn't match
//     }

//     // Introduce flaky behavior based on random integer condition
//     if (i % 3 === 0) {
//       const randomFail = Math.random() > 0.5;
//       if (randomFail) {
//         expect(false).toBe(true); // Flaky failure
//       }
//     }

//     // Example test cases
//     await page.goto('https://example.com');

//     // Capture screenshot artifact
//     await page.screenshot({ path: `error-category-test${i}-screenshot.png` });

//     // Basic interaction
//     await expect(page).toHaveTitle(/Example Domain/);

//     // Tracing interaction
//     if (i === 12) {
//       testInfo.attach('Trace for Error Category Test 12', {
//         body: await page.context().tracing.stop(),
//         contentType: 'application/json',
//       });
//     }
//   });
// }

// // Define 25 tests
// for (let i = 1; i <= 25; i++) {
//   test(`Advanced Error Category Test ${i} @Advanced`, async ({ page }, testInfo) => {
//     testInfo.annotations.push({
//       type: "note",
//       description: "This is a note",
//     });
//     // Randomly skip some tests
//     if (i % 4 === 0) {
//       test.skip(`Skipping Advanced Error Category Test ${i}`);
//     }

//     // Intentionally fail some tests by triggering a network error
//     if (i % 5 === 0) {
//       await expect(async () => {
//         await page.goto('https://example.invalid-url'); // Invalid URL to trigger a network error
//       }).rejects.toThrow('net::ERR_NAME_NOT_RESOLVED');
//     }

//     // Introduce flaky behavior with timeout errors
//     if (i % 3 === 0) {
//       const randomFail = Math.random() > 0.5;
//       if (randomFail) {
//         await expect(async () => {
//           await page.waitForTimeout(1000); // Simulate a delay
//           throw new Error('Timeout exceeded while waiting for an element');
//         }).rejects.toThrow('Timeout exceeded while waiting for an element');
//       }
//     }

//     // Example test cases
//     await page.goto('https://example.com');

//     // Capture screenshot artifact
//     await page.screenshot({ path: `advanced-error-test${i}-screenshot.png` });

//     // Basic interaction
//     await expect(page).toHaveTitle(/Example Domain/);

//     // Tracing interaction
//     if (i === 15) {
//       testInfo.attach('Trace for Advanced Error Category Test 15', {
//         body: await page.context().tracing.stop(),
//         contentType: 'application/json',
//       });
//     }
//   });


// }

