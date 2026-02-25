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
  await page.screenshot({ path: 'screenshots/01_hero_mobile.png' });

  // 2. Invitation Section
  const invitationSection = page.locator('section').filter({ hasText: '소중한 분들을 초대합니다' });
  await invitationSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/02_invitation_mobile.png' });

  // 3. Timeline Section
  const timelineSection = page.locator('section').filter({ hasText: 'Love Story' });
  await timelineSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/03_timeline_mobile.png' });
  await expect(page.locator('text=첫 만남')).toBeVisible();

  // 4. Map Section
  const mapSection = page.locator('section').filter({ hasText: '오시는 길' });
  await mapSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/04_map_mobile.png' });

  // 5. Guestbook Section
  const guestbookSection = page.locator('section').filter({ hasText: '방명록' });
  await guestbookSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/05_guestbook_mobile.png' });
});
