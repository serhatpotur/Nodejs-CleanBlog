const express = require("express");
const ejs = require('ejs');
const app = express();
const port = 3000;

app.use(express.static("public"));

app.set('view engine','ejs');

app.get('/', (req, res) => {
  res.render('index')
});
app.get('/about', (req, res) => {
  res.render('about')
});
app.get('/post', (req, res) => {
  res.render('post')
});
app.get('/add', (req, res) => {
  res.render('add')
});


app.listen(port, () => {
  console.log(`Sunucu ${port} portuyla çalışmaya başladı`);
});
