import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field

const PostSchema = new Schema({
  title: String,
  cover_url: String,
  tags: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  toJSON: {
    virtuals: false,
  },
});

// create PostModel class from schema
const PostModel = mongoose.model('Post', PostSchema);


export default PostModel;
