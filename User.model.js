var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    UserName: String,
    Password: String,
    FirstName:String,
    LastName:String
});


module.exports = mongoose.model('User',UsersSchema);