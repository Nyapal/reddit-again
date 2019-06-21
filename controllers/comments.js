const Post = require('../models/post')
const Comment = require('../models/comment')

module.exports = function(app) {
  // CREATE 
  app.post('/posts/:postId/comments', function(req, res) {
    const comment = new Comment(req.body)

    comment
      .save()
      .then(comment => {
        return Post.findById(req.params.postId);
      })
      .then(post => {
        post.comments.unshift(comment)
        return post.save();
      })
      .then(post => {
        return res.redirect(`/`)
      })
      .catch(err => {
        console.log(err)
      })
  })







}

