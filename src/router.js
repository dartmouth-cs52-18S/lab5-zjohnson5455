import { Router } from 'express';
import * as Posts from './controllers/post_controller';
// import * as UserController from './controllers/user_controller';
// import { requireAuth, requireSignin } from './services/passport';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

// /your routes will go here

/* router.post('/signin', requireSignin, UserController.signin);
router.post('/signup', UserController.signup);
router.post(requireAuth, Posts.createPost);
router.post(requireAuth, Posts.updatePost);
router.post(requireAuth, Posts.deletePost); */

router.route('/posts')
  .post(Posts.createPost)
  .get(Posts.getPosts);

router.route('/posts/:id')
  .get(Posts.getPost)
  .put(Posts.updatePost)
  .delete(Posts.deletePost);

export default router;
