const listHelper = require("../utils/list_helper");

const largeBlogsList = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

// DUMMY TEST
test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

// TOTAL LIKES TESTS
describe("total likes", () => {
  test("of empty list is zero", () => {
    const blogs = [];
    expect(listHelper.totalLikes(blogs)).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const blogs = [
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
      },
    ];
    expect(listHelper.totalLikes(blogs)).toBe(blogs[0].likes);
  });

  test("of a bigger list is calculated right", () => {
    expect(listHelper.totalLikes(largeBlogsList)).toBe(36);
  });
});

// FAVORITE BLOG TESTS
describe("favorite blog", () => {
  test("of empty list is {} empty object", () => {
    const blogs = [];
    expect(listHelper.favoriteBlog(blogs)).toEqual({});
  });

  test("when list has only one blog equals to only blog object", () => {
    const blog = {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    };
    const blogs = [blog];
    expect(listHelper.favoriteBlog(blogs)).toEqual(blog);
  });

  test("of a bigger list returns correct object", () => {
    expect(listHelper.favoriteBlog(largeBlogsList).likes).toBe(12);
  });
});

// MOST BLOGS TESTS
describe("most blogs", () => {
  test("of empty list is {} empty object", () => {
    const blogs = [];
    expect(listHelper.mostBlogs(blogs)).toEqual({});
  });

  test("when list has only one blog return author name and blog count 1", () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
    ];
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: "Michael Chan",
      blogs: 1,
    });
  });

  test("when list has multiple blogs, return author and blog count of any top one", () => {
    expect(listHelper.mostBlogs(largeBlogsList).blogs).toBe(3);
  });
});

// MOST LIKES TESTS
describe("most likes", () => {
  test("of empty list is {} empty object", () => {
    const blogs = [];
    expect(listHelper.mostLikes(blogs)).toEqual({});
  });

  test("when list has only one blog return author name and like count", () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
    ];
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: "Michael Chan",
      likes: 7,
    });
  });

  test("when list has multiple blogs, return author and likes of top one", () => {
    expect(listHelper.mostLikes(largeBlogsList).likes).toBe(17);
  });
});
