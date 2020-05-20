const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  // name: {
  //   type: String,
  //   required: true
  // },
  // email: {
  //   type: String,
  //   required: true
  // },
  // password: {
  //   type: String,
  //   required: true
  // },
  // date: {
  //   type: Date,
  //   default: Date.now
  // }
  name: String,
  twitterId: String,
  email: String,
  password: String,
  twitterProfile: Schema.Types.Mixed,
  user: Schema.Types.Mixed
});
const User = mongoose.model("users", UserSchema);
module.exports = User;
