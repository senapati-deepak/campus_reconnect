var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    body: String,
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    date: String
});

var postModel = mongoose.model('post', postSchema);

module.exports = postModel;