var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    dob: Date,
    designation: String,
    bio: String,
    gender: { type: String, enum: ["male", "female", "other"] },
    email: String,
    contact: String,
    password: String,
    posts: [{type: Schema.Types.ObjectId, ref: 'post'}],
    institutes: [{type: Schema.Types.ObjectId, ref: 'institute'}],
    idetails: [{
        course: String,
        from: { month: String, year: Number },
        to: { month: String, year: Number }
    }],
    skills: [{
        name: String,
        score: {type: Number, min: 0, max: 100}
    }],
    workex: [{
        title: String,
        from: { month: String, year: Number },
        current: {type: Boolean, default: false},
        to: { month: String, year: Number },
        body: String
    }]
});

var userModel = mongoose.model('user', userSchema);

module.exports = userModel;