const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Schema

const PostSchema = new Schema ({
  user: {
    // this associates the user by the id
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        // this associates the user by the id
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        // this associates the user by the id
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
  ],
    date: {
      type: Date,
      default: Date.now
    }
});

module.exports = Post = mongoose.model('post', PostSchema);
