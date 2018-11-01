var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var redPointSchema = new Schema({
    user_id : String,
    point : Number,
    why : String
});

module.exports = mongoose.model('redPoint', redPointSchema);