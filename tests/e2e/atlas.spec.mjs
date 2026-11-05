import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile, writeFile } from 'node:fs/promises';
const data = JSON.parse(await readFile('data.json', 'utf8'));
const ready = async (page) => {
  await page.goto('./');
  await expect(page.locator('#global-search')).toBeEnabled();
};

test('all emotions, records and combined images are reachable without console or network errors', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('response', (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
  });
  await ready(page);
  let selected = 0;
  for (const emotion of data.emotions) {
    await page.locator(`[data-emotion="${emotion.id}"]`).click();
    await expect(page.locator('#active-name')).toHaveText(emotion.display_name);
    for (const view of ['somatic', 'facs', 'actions']) {
      await page.locator(`#tab-${view}`).click();
      const panel = page.locator(`#panel-${view}`);
      const buttons = panel.locator('button[data-record]');
      for (let i = 0; i < (await buttons.count()); i++) {
        await buttons.nth(i).click();
        await expect(buttons.nth(i)).toHaveAttribute('aria-pressed', 'true');
        const img = panel.locator('figure img');
        await img.scrollIntoViewIfNeeded();
        await expect(img).toBeVisible();
        await expect
          .poll(() => img.evaluate((el) => el.complete && el.naturalWidth > 0))
          .toBe(true);
        await expect(img).toHaveAttribute('alt', /.{10,}/);
        selected++;
      }
    }
  }
  expect(selected).toBe(207);
  expect(errors).toEqual([]);
});

test('search, category, keyboard tabs, empty results and hostile text remain usable', async ({
  page,
}) => {
  await ready(page);
  await page.locator('#global-search').fill('nothing-will-match-this');
  await expect(page.locator('#result-count')).toContainText('No matching');
  await expect(page.locator('#active-name')).toHaveText('No emotion selected');
  await page.locator('#global-search').fill('  shame  ');
  await expect(page.locator('#active-name')).toHaveText('Shame');
  await page.locator('#global-search').fill('');
  await page.locator('[data-filter="Social"]').click();
  await expect(page.locator('#emotion-list button')).toHaveCount(3);
  await page.locator('[data-filter="All"]').click();
  await page.locator('#tab-somatic').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#tab-facs')).toBeFocused();
  await expect(page.locator('#tab-facs')).toHaveAttribute('aria-selected', 'true');
  await page.locator('#panel-facs button[data-record]').first().focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#facs-visuals img')).toBeVisible();
  const text = await page.evaluate(async () => {
    const { element, safeSourceURL } = await import('./src/ui/safe-rendering/main.js');
    const e = element('div', '<img src=x onerror="alert(1)">');
    return {
      text: e.textContent,
      children: e.children.length,
      safe: safeSourceURL('javascript:alert(1)'),
    };
  });
  expect(text.children).toBe(0);
  expect(text.safe).toBeNull();
  expect(text.text).toContain('<img');
});

test('required resource failures offer retry; optional prompt failure remains local', async ({
  page,
}) => {
  await page.route('**/data.json', (route) => route.fulfill({ status: 500, body: 'unavailable' }));
  await page.goto('./');
  await expect(page.locator('#retry-load')).toBeVisible();
  await page.unroute('**/data.json');
  await page.locator('#retry-load').click();
  await expect(page.locator('#global-search')).toBeEnabled();
  await page.route('**/prompts.json', (route) => route.fulfill({ status: 404, body: 'missing' }));
  await page.reload();
  await expect(page.locator('#global-search')).toBeEnabled();
  await expect(page.locator('#app-status')).toContainText('prompts are unavailable');
});

test('image errors and denied clipboard provide accessible fallback feedback', async ({ page }) => {
  await ready(page);
  await page.route('**/images/somatic/anger-cardiovascular-0.webp', (route) =>
    route.fulfill({ status: 404, body: 'missing' }),
  );
  await page.locator('#panel-somatic button[data-record]').first().click();
  await expect(page.locator('#somatic-visuals .prompt-fallback')).toBeVisible();
  await page.evaluate(() =>
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async () => {
          throw Error('denied');
        },
      },
    }),
  );
  await page.locator('#somatic-visuals .btn-copy').click();
  await expect(page.locator('#copy-toast')).toContainText('denied');
});

test('automated accessibility, responsive layout, and local performance profile', async ({
  page,
  browserName,
  browser,
}) => {
  await page.addInitScript(() => {
    window.layoutShift = 0;
    window.lastLCP = 0;
    if (PerformanceObserver.supportedEntryTypes.includes('layout-shift'))
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) if (!e.hadRecentInput) window.layoutShift += e.value;
      }).observe({ type: 'layout-shift', buffered: true });
    if (PerformanceObserver.supportedEntryTypes.includes('largest-contentful-paint'))
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) window.lastLCP = e.startTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
  });
  await ready(page);
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(result.violations).toEqual([]);
  expect(
    await page.evaluate(
      () => performance.getEntriesByType('resource').filter((e) => e.name.endsWith('.webp')).length,
    ),
  ).toBe(0);
  const initial = await page.evaluate(() => ({ cls: window.layoutShift, lcp: window.lastLCP }));
  expect(initial.cls).toBeLessThanOrEqual(0.1);
  if (browserName === 'chromium') {
    expect(initial.lcp).toBeGreaterThan(0);
    expect(initial.lcp).toBeLessThanOrEqual(2500);
  }
  await writeFile(
    `docs/reports/performance-${browserName}.json`,
    JSON.stringify(
      {
        profile: 'Local loopback HTTP, unthrottled; no field metrics',
        content_id: test.info().config.metadata.content_id,
        cls: initial.cls,
        lcp_ms: initial.lcp || null,
        initial_webp_requests: 0,
      },
      null,
      2,
    ) + '\n',
  );
  for (const view of ['somatic', 'facs', 'actions']) {
    await page.locator(`#tab-${view}`).click();
    await page.locator(`#panel-${view} button[data-record]`).first().click();
    const selectedState = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(selectedState.violations, `Selected ${view} reference`).toEqual([]);
  }
  // Viewport changes are separate profiles, not accumulated page-load CLS.
  for (const width of [320, 375, 768]) {
    const mobile = await browser.newPage({
      viewport: { width, height: 900 },
      baseURL: 'http://127.0.0.1:4178/atlas/',
    });
    try {
      await ready(mobile);
      expect(
        await mobile.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
      await expect(mobile.locator('#global-search')).toBeVisible();
      await mobile.locator('#panel-somatic button[data-record]').first().click();
      await expect(mobile.locator('#somatic-visuals img')).toBeVisible();
      await mobile.screenshot({ path: `docs/reports/${browserName}-${width}.png`, fullPage: true });
    } finally {
      await mobile.close();
    }
  }
  await page.screenshot({ path: `docs/reports/${browserName}-desktop.png`, fullPage: true });
});

test('staging headers, MIME types and private artifact boundaries', async ({ request }) => {
  for (const [file, mime] of [
    ['data.json', 'application/json'],
    ['app.js', 'text/javascript'],
    ['images/face/anger-full-face.webp', 'image/webp'],
    ['LICENSE', 'text/plain'],
  ]) {
    const response = await request.get(file);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain(mime);
    expect(response.headers()['x-content-type-options']).toBe('nosniff');
    expect(response.headers()['content-security-policy']).toContain("object-src 'none'");
    expect(response.headers()['x-robots-tag']).toContain('noindex');
  }
  for (const file of [
    'node.tasks.json',
    'images/jpg/face/anger-au4.jpg',
    'images/generation-progress.json',
    '.git/config',
  ])
    expect((await request.get(file)).status()).toBe(404);
});
