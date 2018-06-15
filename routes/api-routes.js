// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the players
  app.get("/api/players", function(req, res) {
    // Write code here to retrieve all of the todos from the database and res.json them
    // back to the user
    db.Player.findAll({}).then(function(dbPlayer){
      console.log(dbPlayer);
      res.json(dbPlayer);
    });

  });

  // POST route for saving a new todo. We can create todo with the data in req.body
  app.post("/api/players", function(req, res) {
    // Write code here to create a new todo and save it to the database
    // and then res.json back the new todo to the user
    console.log(req.body);


    db.Player.create({
      name: req.body.text,
      score:req.body.number
    }).then(function(dbPlayer){
      res.json(dbPlayer);
    });
  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  app.delete("/api/players/:id", function(req, res) {
    

    db.Player.destroy({
      where: {
      id: req.params.id
      }
    }).then(function(dbPlayer){
      res.json(dbPlayer);
    });

  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/players", function(req, res) {

    db.Player.update({
      name: req.body.text,
      score: req.body.score
    },{
      where:{
        id: req.body.id
      }
    }).then(function(dbPlayer){
      res.json(dbPlayer);
    });

  });
  // app.get("/", function (req, res) {
  //   connection.query("SELECT * FROM Players;", function (err, data) {
  //     if (err) throw err;

  //     // Test it
  //     // console.log('The solution is: ', data);

  //     // Test it
  //     // return res.send(data);

  //     res.render("index", { Players: data });
  //   });
  // });
};
