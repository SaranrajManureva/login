userModel = require("../models/user");
class user {
  constructor() {
    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password"
        },
        (username, password, done) => {
          userModel.findOne({ email: username }, (err, user) => {
            if (err) throw err;
            if (!user) {
              return done(null, false, { message: "Unknown User" });
            }

            if (bcrypt.compareSync(password, user.password) == false) {
              return done(null, false, { message: "Incorrect password." });
            }
            return done(null, user);
          });
        }
      )
    );

    passport.use(
      new FacebookStrategy(config.facebookAPI, function(
        accessToken,
        refreshToken,
        profile,
        done
      ) {
        var user = {
          lname: profile.name.familyName,
          fname: profile.name.givenName,
          facebookId: profile.id,
          email: profile.emails[0].value
        };

        userModel.findOne({ facebookId: profile.id }).then(result => {
          if (result) {
            //  console.log("user exist");
            return done(null, result);
            //	return res.send({ status: "ERROR", message: "Email already exists" });
          } else {
            userModel.create(user).then(result => {
              return done(null, result);
            });
          }
        });
      })
    );

    passport.use(
      new GoogleStrategy(
        config.googleAPI,
        (accessToken, refreshToken, profile, done) => {
          var user = {
            lname: profile.name.familyName,
            fname: profile.name.givenName,
            googleId: profile.id,
            email: profile.emails[0].value
          };

          userModel.findOne({ googleId: profile.id }).then(result => {
            if (result) {
              //  console.log("user exist");
              return done(null, result);
            } else {
              userModel.create(user).then(result => {
                return done(null, result);
              });
            }
          });
        }
      )
    );

    passport.use(
      new TwitterStrategy(
        config.twitterApi,
        (token, tokenSecret, profile, done) => {
          var user = {
            lname: profile.username,
            fname: profile.displayName,
            twitterId: profile.id
          };

          userModel.findOne({ twitterId: profile.id }).then(result => {
            if (result) {
              //  console.log("user exist");
              return done(null, result);
            } else {
              userModel.create(user).then(result => {
                return done(null, result);
              });
            }
          });
        }
      )
    );

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      userModel.findById(id).then(user => {
        done(null, user);
      });
    });
  }
  userRegistration(req, res) {
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    var user = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, saltRounds),
      address: req.body.address
    };

    userModel.findOne({ email: req.body.email }).then(result => {
      if (result) {
        return res.send({ status: "ERROR", message: "Email already exists" });
      } else {
        userModel.create(user).then(result => {
          req.logIn(result, function(err) {
            if (err) {
              return next(err);
            }
            //  req.flash("success_msg", "Registered Successfully");
            return res.send({
              status: "OK",
              message: "Registered Successfully"
            });
          });
        });
      }
    });
  }

  profileUpdate(req, res) {
    var newvalues = {
      $set: {
        fname: req.body.fname,
        lname: req.body.lname,
        address: req.body.address
      }
    };
    userModel.updateOne({ _id: req.body.id }, newvalues, function(err, result) {
      req.flash("success_msg", "Updated Successfully");
      return res.send({ status: "OK", message: "Registered Successfully" });
    });
  }

  userLogin(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send({ status: "ERROR", message: info.message });
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        //req.flash("success_msg", "Logged In successfully");
        return res.send({ status: "OK", message: "Logged In successfully" });
      });
    })(req, res, next);
  }

  userFacebookLogin(req, res, next) {
    passport.authenticate("facebook", {
      successRedirect: "/profile",
      failureRedirect: "/",
      successFlash: "Welcome!"
    })(req, res, next);
  }
  getFacebookLogin(req, res, next) {
    passport.authenticate("facebook", { scope: ["email"] })(req, res, next);
  }

  userGoogleLogin(req, res, next) {
    passport.authenticate("google", {
      successRedirect: "/profile",
      failureRedirect: "/",
      successFlash: "Welcome!"
    })(req, res, next);
  }
  getGoogleLogin(req, res, next) {
    passport.authenticate("google", { scope: ["profile", "email"] })(
      req,
      res,
      next
    );
  }

  userTwitterLogin(req, res, next) {
    passport.authenticate("twitter", {
      successRedirect: "/profile",
      failureRedirect: "/",
      successFlash: "Welcome!"
    })(req, res, next);
  }
  getTwitterLogin(req, res, next) {
    passport.authenticate("twitter", { scope: ["profile", "email"] })(
      req,
      res,
      next
    );
  }
}

module.exports = user;
