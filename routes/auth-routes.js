const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/Users");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  console.log("LOG IN SUCCESS??");
  console.log(req.user);
  if (req.user) {
    // console.log("successFulll", req.user);
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  } else {
    res.json({
      success: false,
      message: "no user has authenticated",
      user: null,
      cookies: req.cookies
    });
  }
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  console.log("failed login **************");
  res.json({
    success: false,
    message: "user failed to authenticate."
  });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  console.log("logout");
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

// Login Handle
router.post("/login", (req, res, next) => {
  console.log("************login from redirect*********");
  console.log(req.user);
  console.log(req.body);
  passport.authenticate("local", {
    successRedirect: "/auth/login/success",
    failureRedirect: "/auth/login/failed"
    // failureFlash: true
  })(req, res, next);
});

// local strategy register
router.post("/register", (req, res) => {
  const { email, password, password2 } = req.body;
  const errors = [];

  // check required fields
  if (!email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // Check passwords match
  if (password !== password2) {
    errors.push({ msg: " Passwords do not match" });
  }

  // check pass length
  if (password.length < 13) {
    errors.push({ msg: "Passwords should be at least 14 characters" });
  }

  if (errors.length > 0) {
    const data = { success: false, errors: errors };
    res.json(data);
  } else {
    // Validation passed
    User.findOne({ email }).then(user => {
      console.log(user);
      if (user) {
        // user exists
        // user exists
        errors.push({ msg: "Email is already registered" });
        const data = { success: false, errors: errors };
        res.json(data);
      } else {
        const newUser = new User({
          email,
          password
        });
        console.log(newUser);
        // Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // set password to hashed
            newUser.password = hash;
            // save user
            newUser
              .save()
              .then(user => {
                req.logIn(user, err => {
                  if (!err) {
                    const results = {
                      success: true,
                      message: "user has successfully authenticated",
                      // user: req.user,
                      email: req.user.email,
                      cookies: req.cookies
                    };
                    res.json(results);
                  } else {
                    res.json(err);
                  }
                });
                // res.redirect("/auth/login");
                // res.redirect(CLIENT_HOME_PAGE_URL);
              })
              .catch(err => console.log(err));
          })
        );
      }
    });
  }
});

// auth with twitter
router.get("/twitter", passport.authenticate("twitter"));
// router.get("/twitter", (req, res) => {
//   console.log("get twitter auth");
//   res.send("authed");
// });

// redirect to home page after successfully login via twitter
router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed"
  })
);

module.exports = router;
