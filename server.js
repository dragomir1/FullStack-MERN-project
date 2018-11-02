const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

mongoose.Promise = global.Promise;
// connect to mongodb
mongoose.connect(db);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));



// routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

// passport
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);


// port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on Port ${port}`));
