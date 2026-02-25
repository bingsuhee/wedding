import { test, expect } from '@playwright/test';

test.use({
  viewport: { width: 375, height: 812 },
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
});

test('verify wedding invitation sections', async ({ page }) => {
  test.setTimeout(60000);

  await page.goto('http://localhost:5173');

  // 1. Hero Section
  await expect(page.locator('h1')).toContainText('김철수');

  // 2. Timeline Section
  const timelineSection = page.locator('section').filter({ hasText: 'Love Story' });
  await timelineSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await expect(page.locator('h4').filter({ hasText: '1000일' })).toBeVisible();
  await page.screenshot({ path: 'screenshots/02_timeline_mobile.png' });

  // 3. Gallery Section
  const gallerySection = page.locator('section').filter({ hasText: 'Gallery' });
  await gallerySection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  // Check initial count (should be 6)
  const initialImages = await page.locator('section:has-text("Gallery") img').count();
  expect(initialImages).toBe(6);
  await page.screenshot({ path: 'screenshots/03_gallery_initial.png' });

  // Click Load More
  const loadMoreBtn = page.locator('button:has-text("더보기")');
  await loadMoreBtn.click();
  await page.waitForTimeout(1000);

  // Check new count (should be 12)
  const expandedImages = await page.locator('section:has-text("Gallery") img').count();
  expect(expandedImages).toBe(12);

  // Button should be gone now
  await expect(loadMoreBtn).not.toBeVisible();
  await page.screenshot({ path: 'screenshots/03_gallery_expanded.png' });

  // 4. Map Section
  const mapSection = page.locator('section').filter({ hasText: '오시는 길' });
  await mapSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/04_map_mobile.png' });
});
