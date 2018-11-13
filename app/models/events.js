var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    name: { type: String },
    venue: { type: String },
    date: { type: String },
    startTime: { type: Date },
    endTime: { type: Date },
    isOver: { type: Boolean },
    content: { type: String },
    institute: { type: Schema.Types.ObjectId, ref: 'institute' },
    isApproved: { type: Boolean, default: false },
    poster: { type: Schema.Types.ObjectId, ref: 'user' }
});

var eventModel = mongoose.model('event', eventSchema);

module.exports = eventModel;