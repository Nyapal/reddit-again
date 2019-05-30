const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = express();
const port = 3000

mongoose.connect('mongodb://localhost/reddit2', { useNewUrlParser: true });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');


// const Post = mongoose.model('Post', {
//   title: String,
//   body: String
// })

require('./controllers/posts.js')(app);
require('./data/reddit-db');
// require('./controllers/comments.js')(app);
// require('./controllers/auth.js')(app);
// require('./controllers/replies.js')(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))