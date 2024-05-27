const { test, describe } = require('node:test');
const assert = require('node:assert');

const dummy = require('../utils/list_helper').dummy;

describe('dummy', () => {
  const blogs = [];

  test('always returns 1', () => {
    assert.strictEqual(dummy(blogs), 1);
  });
});
