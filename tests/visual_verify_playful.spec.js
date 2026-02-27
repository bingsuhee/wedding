import { test } from '@playwright/test';

test('visual verification of playful design and notification', async ({ page }) => {
  // Go to the local dev server
  await page.goto('http://localhost:5173');

  // 1. Hero / Main
  await page.waitForSelector('text=김철수 & 이영희');
  await page.screenshot({ path: '01_hero_playful.png' });

  // 2. Timeline
  const timeline = page.locator('section').filter({ hasText: 'Love Story' });
  await timeline.scrollIntoViewIfNeeded();
  await page.screenshot({ path: '02_timeline_visible_line.png' });

  // 3. Notification Test
  // Click the test button
  const testBtn = page.getByRole('button', { name: '알림 테스트' });
  await testBtn.click();

  // Wait for notification to appear
  await page.waitForSelector('text=새로운 축하 메시지');
  await page.screenshot({ path: '03_notification_test.png' });

  // Wait a bit to see if next one shows up (sequentially)
  await page.waitForTimeout(4000);
  await page.screenshot({ path: '04_notification_queue_test.png' });
});
