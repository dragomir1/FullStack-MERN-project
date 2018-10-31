const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

const app = express();

// DB config
const db = require('./config/keys').mongoURI;

mongoose.Promise = global.Promise;
// connect to mongodb
mongoose.connect(db);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());

// routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);


app.get('/', (req, res) => res.send('hello world'));


// port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on Port ${port}`));
