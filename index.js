var express = require('express');
var path = require('path');
var fs = require('fs');
var bp = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');

var app = express();

app.set('view-engine', 'ejs');
app.use(express.static(path.join(__dirname, "static")));
app.use(bp.urlencoded({extended: false}));
app.use(ejsLayouts);

// GET /drums - returns all drums
app.get('/drums', function(req, res) {
	var drumData = fs.readFileSync('./data.json');
  dataData = JSON.parse(drumData);
  // this is a way to send straight json data back to the front
  res.json(drumData);
});

app.listen(3000);