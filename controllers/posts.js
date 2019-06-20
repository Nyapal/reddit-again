const Post = require('../models/post');

module.exports = (app) => {  
  
  // CREATE
  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);
    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });

  // CREATE FORM
  app.get('/posts/new', (req, res) => {
    res.render('posts-new', {})
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

  // POST/:id
  app.get("/posts/:id", function(req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id)
      .then(post => {
        res.render("posts-show", { post });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  //SUBREDDIT
  app.get('/n/:subreddit', function(req, res) {
    Post.find({ subreddit: req.params.subreddit })
      .then(posts => {
        res.render('posts-index', {posts});
      })
      .catch(err => {
        console.log(err.message)
      })
  })

};