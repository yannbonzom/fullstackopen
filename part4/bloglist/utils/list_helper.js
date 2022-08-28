var _ = require("lodash");

const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes;
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : blogs.reduce((prev, cur) => (prev.likes < cur.likes ? cur : prev));
};

const mostBlogs = (blogs) => {
  return blogs.length === 0
    ? {}
    : _(blogs)
        .groupBy("author")
        .map((items, author) => ({ author, blogs: items.length }))
        .reduce((prev, cur) => (prev.blogs < cur.blogs ? cur : prev));
};

const mostLikes = (blogs) => {
  return blogs.length === 0
    ? {}
    : _(blogs)
        .groupBy("author")
        .map((items, author) => ({
          author,
          likes: items.reduce((sum, item) => sum + item.likes, 0),
        }))
        .reduce((prev, cur) => (prev.likes < cur.likes ? cur : prev));
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
