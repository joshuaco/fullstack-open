const { test, describe } = require('node:test');
const assert = require('node:assert');

const mostBlogs = require('../utils/list_helper').mostBlogs;
const mostLikes = require('../utils/list_helper').mostLikes;
const blogs = require('../mocks/blogs');

describe('most blogs', () => {
  test('of empty list is null', () => {
    assert.strictEqual(mostBlogs([]), null);
  });

  test('of a list of blogs', () => {
    assert.deepStrictEqual(mostBlogs(blogs), {
      author: 'Robert C. Martin',
      blogs: 3
    });
  });
});

describe('most likes', () => {
  test('of empty list is null', () => {
    assert.strictEqual(mostLikes([]), null);
  });

  test('of a list of blogs', () => {
    assert.deepStrictEqual(mostLikes(blogs), {
      author: 'Edsger W. Dijkstra',
      likes: 17
    });
  });
});
