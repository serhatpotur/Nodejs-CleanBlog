const Blog = require("../models/Blog");

exports.getAllAsync = async (req, res) => {
  const blogs = await Blog.find({}).sort("-dateCreated");
  res.render("index", {
    blogs,
  });
};

exports.getBlogByIdAsync = async (req, res) => {
  //console.log(req.params.id);
  //res.render("post");
  const blog = await Blog.findById(req.params.id);
  res.render("post", { blog });
};

exports.addBlog = (req, res) => {
  res.render("add");
};

exports.createBlogAsync = async (req, res) => {
  await Blog.create(req.body);
  //console.log(req.body);
  res.redirect("/");
};

exports.editBlogAsync = async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id });
  res.render("edit", { blog });
};

exports.updateBlogAsync = async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id });
  blog.title = req.body.title;
  blog.detail = req.body.detail;
  blog.save();

  res.redirect(`/post/${req.params.id}`);
};

exports.deleteBlogAsync = async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.redirect("/");
};
