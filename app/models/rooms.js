var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    name: String,
    members: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    institute: { type: Schema.Types.ObjectId, ref: 'institute' }
});

var roomModel = mongoose.model('room', roomSchema);

module.exports = roomModel;