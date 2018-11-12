var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var instituteSchema = new Schema({
    name: String,
    address: String,
    contact: String,
    email: String,
    bio: String,
    alumcell: [{
        name: String,
        contact: String,
        email: String
    }]
});

var instituteModel = mongoose.model('institute', instituteSchema);

module.exports = instituteModel;