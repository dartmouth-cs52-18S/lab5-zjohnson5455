import Post from '../models/post_model';

// this cleans the posts because we use id instead of dangling _id
const cleanPosts = (posts) => {
  return posts.map((post) => {
    return {
      id: post._id, title: post.title, tags: post.tags, cover_url: post.cover_url,
    };
  });
};

export const createPost = (req, res) => {
  const post = new Post();
  Object.assign(post, { title: req.body.title });
  // res.send(post);
  console.log('hey');
  post.save()
    .then((result) => {
      console.log(result);
      res.json({ message: 'Post created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const getPosts = (req, res) => {
  Post.find()
    .then((result) => {
      const clean = cleanPosts(result);
      res.json({ posts: clean });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
export const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((result) => {
      res.json({ post: result });
    })
    .catch((error) => {
      res.send(error.message);
    });

  /* const postSingular = Post.findById(req.body.id, (err, post) => {
    if (err) return console.error(err);
    return post;
  });
  res.send(postSingular); */
};
export const deletePost = (req, res) => {
  /* Post.remove({ id: req.body.id }, (err) => {
    if (err) return console.error(err);
    return res.json({ message: 'Post deleted!' });
  }); */
  res.send('delete post from zack');
};
export const updatePost = (req, res) => {
  // const query = { id: req.body.id };
  // Post.findOneAndUpdate(query, { title: 'New title' }, callback);
  res.send('update post from zack');
};
