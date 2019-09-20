var UserSchema = mongoose.Schema({
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  address: {
    type: String
  },
  facebookId: {
    type: String
  },
  googleId: {
    type: String
  },
  twitterId: {
    type: String
  }
});

var User = (module.exports = mongoose.model("User", UserSchema));
