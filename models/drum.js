const mongoose = require('mongoose');

var drumSchema = new mongoose.Schema({
	instrument: String,
	size: Number
});

var Drum = mongoose.model("Drum", drumSchema);

module.exports = Drum;