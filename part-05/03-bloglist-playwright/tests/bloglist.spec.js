import { test, describe, beforeEach, expect } from '@playwright/test';
import { createBlog, loginWith } from './helper';

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

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test', 'testerization');
    });

    test('a new blog can be created', async ({ page }) => {
      createBlog(
        page,
        'new blog by playwright',
        'playwright',
        'https://www.playwright.dev'
      );

      await expect(
        page.getByText(
          "Blog 'new blog by playwright' has been added successfully!"
        )
      ).toBeVisible();

      await expect(
        page.getByText('new blog by playwright - playwright')
      ).toBeVisible();

      await expect(page.getByRole('button', { name: 'view' })).toBeVisible();
    });
  });

  describe('when blog is created', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test', 'testerization');
      await createBlog(
        page,
        'another blog from playwright',
        'playwright',
        'https://www.playwright.dev'
      );
    });

    test('blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click();
      await page.getByRole('button', { name: 'like' }).click();

      await expect(page.getByText('likes 1')).toBeVisible();
    });

    test('blog can be deleted', async ({ page }) => {
      // Enable dialog handler
      page.on('dialog', async (dialog) => await dialog.accept());

      await page.getByRole('button', { name: 'view' }).click();
      await page.getByRole('button', { name: 'remove' }).click();

      expect(
        page.getByText('another blog from playwright - playwright')
      ).not.toBeVisible();
    });
  });

  describe('when are more users registered', () => {
    beforeEach(async ({ page }) => {
      await request.post('/api/users', {
        data: {
          name: 'admin',
          username: 'admin',
          password: 'administrator'
        }
      });
      await page.getByRole('button', { name: 'logout' }).click();
      await loginWith(page, 'admin', 'administrator');
    });

    test('only the blog creator can delete the blog', async ({ page }) => {
      await page.getByRole('button', { name: 'view' });
    });
  });

  describe('when several blogs are created', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test', 'testerization');
      await createBlog(
        page,
        'first blog',
        'playwright',
        'https://www.playwright.dev'
      );
      await createBlog(
        page,
        'second blog',
        'playwright',
        'https://www.playwright.dev'
      );
      await createBlog(
        page,
        'third blog',
        'playwright',
        'https://www.playwright.dev'
      );
    });

    test.only('blogs are ordered according to likes', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).last().click();
      await page.getByRole('button', { name: 'like' }).click();
      await page.getByRole('button', { name: 'like' }).click();

      await page.getByRole('button', { name: 'view' }).nth(1).click();
      await page.getByRole('button', { name: 'like' }).nth(1).click();

      await page.getByRole('button', { name: 'view' }).click();

      const blogs = await page.$$eval('.blog', (blogs) => {
        return blogs.map((blog) => {
          const likes = blog.querySelector('.likes').textContent;
          return parseInt(likes.split(' ')[1]);
        });
      });

      blogs.forEach((blog) => {
        expect(blog).toBeLessThanOrEqual(blogs[0]);
      });
    });
  });
});
