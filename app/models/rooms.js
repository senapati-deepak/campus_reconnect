var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    name: String,
    members: [{ type: Schema.Types.ObjectId, ref: 'user' }]
});

var roomModel = mongoose.model('room', roomSchema);

module.exports = roomModel;