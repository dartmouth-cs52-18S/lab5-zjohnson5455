import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });


export const signin = (req, res, next) => {
  console.log(req.user);
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }
  // here you should do a mongo query to find if a user already exists with this email.
  // if user exists then return an error. If not, use the User model to create a new user.
  // Save the new User object
  // this is similar to how you created a Post
  // and then return a token same as you did in in signin
  User.findOne({ email })
    .then((result) => {
      console.log(`result${result}`);
      if (result) { return res.status(422).send('An account already exists'); } else {
        const user = new User();
        Object.assign(user, { email, password });
        console.log(user);
        user.save()
          .then((result1) => {
            console.log('found results');
            res.send({ token: tokenForUser(user) });
          })
          .catch((error) => {
            console.log('found an error in save');
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => {
      // res.status(500).json({ error });
      return res.status(422).send('An account already exists for this email');
    });
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
