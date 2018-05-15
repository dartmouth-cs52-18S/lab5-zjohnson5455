import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// create a PostSchema with a title field

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.set('toJSON', {
  virtuals: true,
});

UserSchema.pre('save', function beforeyYourModelSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const user = this;
  if (!user.isModified('password')) return next();

  // generate a salt
  // https://stackoverflow.com/questions/14588032/mongoose-password-hashing
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      return next();
    });
  });


  // when done run the next callback with no arguments
  // call next with an error if you encounter one
  // return next();
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) cb(err);
    cb(null, isMatch);
  });
};


// create PostModel class from schema
const UserModel = mongoose.model('User', UserSchema);


export default UserModel;
