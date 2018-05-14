import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// create a PostSchema with a title field

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
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
  const salty = bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    return salt;
  });

  const hashy = bcrypt.hash(user.password, salty, (err, hash) => {
    if (err) return next(err);
    return hash;
  });

  user.password = hashy;
  return next();

  // when done run the next callback with no arguments
  // call next with an error if you encounter one
  // return next();
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  const res = bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
  return res;
};


// create PostModel class from schema
const UserModel = mongoose.model('User', UserSchema);


export default UserModel;
