// Express RESTful routing Deliverable
var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');
const Drum = require('./models/drum');
// var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "static")));
app.use(bp.urlencoded({extended: true}));
// app.use(ejsLayouts);

// Mongoose stuff
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/express-api');

// GET /drums - returns all drums
app.get('/drums', function(req, res) {
  Drum.find({}, function(err, drums) {
    console.log(drums);
    res.render("drums/index", {drums: drums});
  });
});

// GET /drums/new - return the form for adding a drum (CREATE)
app.get('/drums/new', function(req, res) {
  res.render("drums/new");
});

// POST /drums - adds a new drum
app.post('/drums', function(req, res) {
  Drum.create({
    instrument: req.body.instrument,
    size: req.body.size
  }, function(err, drum) {
    console.log("drum created is: ", drum);
    console.log("error is: ", err);
  });
  res.redirect("/drums");
});

// GET /drums - returns specific drum
app.get('/drums/:id', function(req, res) {
  Drum.findById(req.params.id, function(err, drum) {
    console.log(drum);
    console.log(err);
    res.render("drums/show", {drum: drum});
  });
});

// GET /drums/:id/edit - edit a specific drum
app.get('/drums/:id/edit', function(req, res) {
  Drum.findById(req.params.id, function(err, drum) {
    console.log(drum);
    console.log(err);
    res.render("drums/edit", {drum: drum});
  });
});

// PUT /drums - update a specific drum item
app.put('/drums/:id', function(req, res) {
  Drum.update({_id: req.params.id},{
    instrument: req.body.instrument,
    size: req.body.size
  }, function(err, drum) {
    console.log(drum);  
    res.json(drum);
  });
});

// DELETE /drums - delete a specific drum
app.delete('/drums/:id', function(req, res) {
  Drum.remove({_id: req.params.id}, function(err) {
    console.log(err);
  });
  res.json("deleted!");
});

app.listen(3000);