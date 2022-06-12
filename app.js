const express = require("express");
const mongoose = require("mongoose");
const blogController=require('./controllers/blogController')
const ejs = require("ejs");
var methodOverride = require("method-override");
const app = express();
const port = 3000;

//Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

// db Connect
mongoose.connect("mongodb://127.0.0.1:27017/cleanblog-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Database Connected");
  }).catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");

// ROUTES

// Home - All Blog
app.get("/", blogController.getAllAsync );

// Get Blog By Id
app.get("/post/:id", blogController.getBlogByIdAsync);

// Get Methot - Add Blog
app.get("/add", blogController.addBlog);

//Post Method - Create Blog
app.post("/blogs", blogController.createBlogAsync);

// Get Method - Edit Blog
app.get("/blogs/edit/:id", blogController.editBlogAsync);

// Put Method - Update Blog
app.put("/blogs/:id", blogController.updateBlogAsync)

// Delete Method - Delete Blog
app.delete('/blogs/:id',blogController.deleteBlogAsync)

app.get("/about", (req, res) => {
  res.render("about");
});




app.listen(port, () => {
  console.log(`Sunucu ${port} portuyla çalışmaya başladı`);
});
