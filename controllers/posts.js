const Post = require('../models/post');

module.exports = (app) => {  
  
  // CREATE
  app.post('/posts/new', (req, res) => {
    if(req.user) {
      // INSTANTIATE INSTANCE OF POST MODEL
      const post = new Post(req.body);
      post.author = req.user_id
      
      // SAVE INSTANCE OF POST MODEL TO DB
      post
        .save()
        .then(post => {
          return User.findById(req.user._id)
        })
        .then(user => {
          user.posts.unshift(post)
          user.save()
          // REDIRECT TO THE NEW POST
          return res.redirect(`/posts/${post._id}`);
        })
        .catch(err => {
          console.log(err.message)
        })
      } else {
        return res.status(401);
      }
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
    Post.findById(req.params.id).populate('comments')
      .then((post) => {
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