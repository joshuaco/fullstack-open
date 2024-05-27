const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0);
};

const favoriteBlog = (blogs) => {
  const likedBlog =
    blogs.length === 0
      ? null
      : blogs.reduce((acc, curr) => (acc.likes > curr.likes ? acc : curr), 0);

  return likedBlog;
};

// Author with most blogs
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authors = blogs
    .map((blog) => blog.author)
    .reduce((acc, curr) => {
      if (acc[curr]) {
        acc[curr] += 1;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});
  const max = Math.max(...Object.values(authors));
  const author = Object.keys(authors).filter((key) => authors[key] === max);
  return { author: author[0], blogs: max };
};

// Author with most liked blogs
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authors = blogs
    .map((blog) => {
      return { author: blog.author, likes: blog.likes };
    })
    .reduce((acc, curr) => {
      if (acc[curr.author]) {
        acc[curr.author] += curr.likes;
      } else {
        acc[curr.author] = curr.likes;
      }
      return acc;
    }, {});
  const max = Math.max(...Object.values(authors));
  const author = Object.keys(authors).filter((key) => authors[key] === max);

  return { author: author[0], likes: max };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
