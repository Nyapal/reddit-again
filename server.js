const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();
const port = 3000

require('./data/reddit-db');

mongoose.connect('mongodb://localhost/reddit2', { useNewUrlParser: true });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

// let posts = [
//   { comment: 'first post' },
//   { comment: 'second post' } 
// ]

const Post = mongoose.model('Post', {
  title: String,
  body: String
})

// INDEX
app.get('/', (req, res) => {
  Post.find()
    .then(posts => {
      res.render('posts-index', {posts: posts})
    })
    .catch(err => {
      console.log(err)
    })
})

// NEW POST FORM
app.get('/posts/new', (req, res) => {
  res.render('posts-new', {})
})

// CREATE
app.post('/posts', (req, res) => {
  // Post.create(req.body).then((post) => {
  //   console.log(post)
  //   res.redirect('/')
  // }).catch((err) => {
  //   console.log(err.message)
  // })
  const post = new Post(req.body)

  post.save((err, post) => {
    return res.redirect(`/`)
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))