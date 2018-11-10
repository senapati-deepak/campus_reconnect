var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    dob: String,
    email: String,
    contact: Number,
    password: String,
    posts: [{type: Schema.Types.ObjectId, ref: 'post'}],
    connections: [{type: Schema.Types.ObjectId, ref: 'user'}]
});

var userModel = mongoose.model('user', userSchema);

module.exports = userModel;