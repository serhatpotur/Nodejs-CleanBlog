const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/Blog");
const ejs = require("ejs");
const app = express();
const port = 3000;

//Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// db Connect
mongoose
  .connect("mongodb://127.0.0.1:27017/cleanblog-test-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const blogs= await Blog.find({});
  res.render("index",{
    blogs
  });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/post", (req, res) => {
  res.render("post");
});
app.get("/add", (req, res) => {
  res.render("add");
});
app.post("/blogs", async (req, res) => {
  await Blog.create(req.body)
  //console.log(req.body);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portuyla çalışmaya başladı`);
});
