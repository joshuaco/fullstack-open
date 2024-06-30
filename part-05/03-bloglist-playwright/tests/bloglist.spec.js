import { test, describe, beforeEach, expect } from '@playwright/test';
import { loginWith } from './helper';

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/test/reset');
    await request.post('/api/users', {
      data: {
        name: 'tester',
        username: 'test',
        password: 'testerization'
      }
    });

    await page.goto('/');
  });

  test('login form is visible', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'test', 'testerization');
      await expect(page.getByText('Welcome tester')).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'test', 'wrong');
      await expect(
        page.getByText('Error: username or password incorrect')
      ).toBeVisible();
    });
  });
});
