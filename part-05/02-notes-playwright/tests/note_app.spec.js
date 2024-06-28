import { test, expect, beforeEach, describe } from '@playwright/test';
import { loginWith, createNote } from './helper';

describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        name: 'admin',
        username: 'admin',
        password: 'admin'
      }
    });

    await page.goto('/');
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

  test('user can login with correct credentials', async ({ page }) => {
    await loginWith(page, 'admin', 'admin');
    await expect(page.getByText('admin logged-in')).toBeVisible();
  });

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'admin', 'wrong');

    const errordiv = await page.locator('.error');

    await expect(errordiv).toContainText('username or password incorrect');
    await expect(errordiv).toHaveCSS('border-style', 'solid');

    await expect(page.getByText('admin logged-in')).not.toBeVisible();
  });

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'admin', 'admin');
    });

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright');

      await expect(
        page.getByText('a note created by playwright')
      ).toBeVisible();
    });

    describe('and several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'a new note by playwright');
        await createNote(page, 'another note by playwright');
        await createNote(page, 'a third note created by playwright');
      });

      test.only('importance can be changed', async ({ page }) => {
        await page.pause();

        const noteText = await page.getByText('another note by playwright');
        const noteElement = await noteText.locator('..');

        await noteElement
          .getByRole('button', { name: 'Make important' })
          .click();
        await expect(noteElement.getByText('make not important')).toBeVisible();
      });
    });
  });
});
