const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (!Array.isArray(blogs)) return;

  const total = blogs.reduce((acc, curr) => {
    return acc + curr.likes;
  }, 0);

  return total;
};

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (prev, curr) => (prev.likes > curr.likes ? prev : curr),
    blogs[0]
  );
};

const mostBlogs = (blogs) => {
  let authorWithBlogs = {};

  blogs.forEach((blog, index) => {
    const author = blog.author;
    if (authorWithBlogs[author]) {
      authorWithBlogs[author] += 1;
    } else authorWithBlogs[author] = 1;
  });

  return Object.entries(authorWithBlogs).reduce(
    (acc, [key, value]) => {
      console.log(acc, key, value);
      if (value > acc.blogs) {
        return { author: key, blogs: value };
      } else {
        return acc;
      }
    },
    { author: "", blogs: 0 }
  );
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
