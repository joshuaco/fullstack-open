import { test, describe, beforeEach, expect } from '@playwright/test';

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('login form is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });
});
