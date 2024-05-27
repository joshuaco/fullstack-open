const { test, describe } = require('node:test');
const assert = require('node:assert');

const blogs = require('../mocks/blogs');
const favoriteBlog = require('../utils/list_helper').favoriteBlog;

describe('favorite blog', () => {
  test('of empty list is null', () => {
    assert.strictEqual(favoriteBlog([]), null);
  });

  test('of a list of blogs', () => {
    assert.deepStrictEqual(favoriteBlog(blogs), blogs[2]);
  });
});
