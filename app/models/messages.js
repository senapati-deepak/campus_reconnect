var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    room: { type: Schema.Types.ObjectId, ref: 'room' },
    sender: { type: Schema.Types.ObjectId, ref: 'user' },
    body: String,
    time: Date
});

var messageModel = mongoose.model('message', messageSchema);

module.exports = messageModel;