var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gooutSchema = new Schema({
    user_id : String,
    starttime : String,
    stoptime : String,
    why : String
});

module.exports = mongoose.model('goout', gooutSchema);