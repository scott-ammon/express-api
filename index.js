// Express RESTful routing Deliverable
var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');
// var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "static")));
app.use(bp.urlencoded({extended: true}));
// app.use(ejsLayouts);

// GET /drums - returns all drums
app.get('/drums', function(req, res) {
  var drumData = fs.readFileSync('./data.json');
  drumData = JSON.parse(drumData);
  // this is a way to send straight json data back to the front
  res.render("drums/index", {drums: drumData});
});

// GET /drums/new - return the form for adding a drum (CREATE)
app.get('/drums/new', function(req, res) {
  res.render("drums/new");
});

// POST /drums - adds a new drum
app.post('/drums', function(req, res) {
  var drumData = fs.readFileSync('./data.json');
  drumData = JSON.parse(drumData);
  drumData.push({instrument: req.body.instrument, size: req.body.size});
  fs.writeFileSync('./data.json', JSON.stringify(drumData));
  res.redirect("/drums");
});

// GET /drums - returns specific drum
app.get('/drums/:id', function(req, res) {
  var id = req.params.id;
  var drumData = fs.readFileSync('./data.json');
  drumData = JSON.parse(drumData);
  if(id < drumData.length) {
    res.render("drums/show", {drum: drumData[id]});
  } else {
    res.send("That drum index doesn't exist! Try again!");
  }
});

// GET /drums/:id/edit - edit a specific drum
app.get('/drums/:id/edit', function(req, res) {
  var drumData = fs.readFileSync('./data.json');
  drumData = JSON.parse(drumData);
  res.render("drums/edit", {drum: drumData[req.params.id], id: req.params.id});
});

// PUT /drums - update a specific drum item
app.put('/drums/:id', function(req, res) {
  var id = req.params.id;
  var drumData = fs.readFileSync('./data.json');
  drumData = JSON.parse(drumData);
  if(id < drumData.length) {
    drumData[id].instrument = req.body.instrument;
    drumData[id].size = req.body.size;
    fs.writeFileSync('./data.json', JSON.stringify(drumData));
    res.json(drumData);
  } else {
    res.send("That drum index doesn't exist! Try again!");
  }
});

// DELETE /drums - delete a specific drum
app.delete('/drums/:id', function(req, res) {
  var id = req.params.id;
  var drumData = fs.readFileSync('./data.json');
  drumData = JSON.parse(drumData);
  if(id < drumData.length) { 
    drumData.splice(id, 1);
    fs.writeFileSync('./data.json', JSON.stringify(drumData));
    res.json(drumData);
  } else {
    res.send("You can't delete a drum that doesn't exist! Try again!");
  }
});

app.listen(3000);