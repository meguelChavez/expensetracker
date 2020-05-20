require("dotenv").config();
const express = require("express");
const keys = require("./config/keys");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const authRoutes = require("./routes/auth-routes");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

require("./config/passport-config")(passport);

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cookieSession({
    maxAge: 3 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

// parse cookies
app.use(cookieParser());

// initalize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

app.use(express.static("public"));

// set up cors to allow us to accept requests from our client
// app.use(
//   cors({
//     origin: "http://localhost:3000", // allow to server to accept request from different origin
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true // allow session cookie from browser to pass through
//   })
// );

// set up routes
app.use("/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// app.get("/", (request, response) => {
//   response.sendFile(path.join(__dirname, "client/build", "index.html"));
// });
require("./routes/api-routes")(app);

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/MERNBoilerPlate", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(err => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(` server listening on port ${PORT}`);
});
