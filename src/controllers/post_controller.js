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
};
export const deletePost = (req, res) => {
  Post.remove({ _id: req.params.id })
    .then((result) => {
      res.json({ message: 'Post deleted!' });
    })
    .catch((error) => {
      res.send(error.message);
    });
};
export const updatePost = (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { title: req.body.title })
    .then((result) => {
      res.json({ message: 'Post updated' });
    })
    .catch((error) => {
      res.send(error.message);
    });
};
