var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    body: String,
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    date: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    comments: [
        {
            user: {type: Schema.Types.ObjectId, ref: 'user'},
            comment: String
        } 
    ],
    institute: { type: Schema.Types.ObjectId, ref: 'institute' }
});

var postModel = mongoose.model('post', postSchema);

module.exports = postModel;