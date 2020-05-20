const TwitterStrategy = require("passport-twitter");
const LocalStrategy = require("passport-local");
const keys = require("./keys");
const User = require("../models/Users");
const bcrypt = require("bcrypt");

module.exports = passport => {
  // serialize the user.id to save in the cookie session
  // so the browser will remember the user when login
  passport.serializeUser((user, done) => {
    console.log("serilize");
    console.log(user);
    console.log("************************");
    done(null, user.id);
  });

  // deserialize the cookieUserId to user in the database
  passport.deserializeUser((id, done) => {
    console.log("deserializer");
    console.log(id);
    User.findById(id)
      .then(user => {
        console.log(user);
        console.log("************************");
        done(null, user);
      })
      .catch(e => {
        done(new Error("Failed to deserialize an user"));
      });
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email"
      },
      (email, password, done) => {
        // Matcch User
        User.findOne({
          email
        })
          .then(user => {
            console.log("local strategy", user);
            if (!user) {
              return done(null, false, {
                message: "That email is not registered"
              });
            }

            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              console.log("match*****", isMatch);
              if (err) throw err;

              if (isMatch) {
                console.log("log in successful");
                return done(null, user);
              }
              return done(null, false, {
                message: "Password incorrect"
              });
            });
          })
          .catch(err => console.log(err));
      }
    )
  );

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: keys.twitter.CONSUMER_KEY,
        consumerSecret: keys.twitter.CONSUMER_SECRET,
        callbackURL: "/auth/twitter/redirect"
      },
      async (token, tokenSecret, profile, done) => {
        // find current user in UserModel

        const currentUser = await User.findOne({
          twitterId: profile._json.id_str
        });
        // create new user if the database doesn't have this user
        if (!currentUser) {
          const newUser = await new User({
            name: profile._json.name,
            screenName: profile._json.screen_name,
            twitterId: profile._json.id_str,
            profileImageUrl: profile._json.profile_image_url,
            user: profile
          }).save();
          if (newUser) {
            console.log("newuser ****", newUser);
            console.log("************************");
            done(null, newUser);
          }
        }
        console.log("currentUser", currentUser);
        console.log("************************");
        done(null, currentUser);
      }
    )
  );
};
