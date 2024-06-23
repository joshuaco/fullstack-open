import { test, expect, beforeEach, describe } from '@playwright/test';

describe('Note app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Notes');

    // checks that the element assigned to locator is visible on page.
    await expect(locator).toBeVisible();

    // checks if page contains the given text.
    await expect(
      page.getByText(
        'Note app, Department of Computer Science, University of Helsinki 2024'
      )
    ).toBeVisible();
  });

  test('login form can be opened', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click();
    await page.getByTestId('username').fill('admin');
    await page.getByTestId('password').fill('admin');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('admin logged-in')).toBeVisible();
  });

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click();
      await page.getByTestId('username').fill('admin');
      await page.getByTestId('password').fill('admin');
      await page.getByRole('button', { name: 'Login' }).click();
    });

    test('a new note can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new note' }).click();
      await page.getByRole('textbox').fill('a note created by playwright');
      await page.getByRole('button', { name: 'Add Note' }).click();

      await expect(
        page.getByText('a note created by playwright')
      ).toBeVisible();
    });
  });
});
