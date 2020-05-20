// Require all models
const db = require("../models");

module.exports = function(app) {
  app.get("/api/example", function(req, res) {
    console.log("api/example");
    db.Example.find({})
      .then(function(db) {
        // console.log(db);
        res.json(db);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.get("/api/helloworld", (req, res) => {
    res.json({ hello: "hello world" });
  });

  app.post("/api/addexample", function(req, res) {
    console.log(req.body);
    db.Example.create(req.body.data)
      .then(function(db) {
        res.json(db);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.put("/api/example", function(req, res) {
    db.Example.findOneAndUpdate(
      {
        todo: req.body.todo
      },
      {
        $set: {
          completed: req.body.completed
        }
      }
    )
      .then(function(db) {
        res.json(db);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};
