var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TasksSchema = new Schema({
    UserName: String,
    Title: String,
    Desc:String
});


module.exports = mongoose.model('Task',TasksSchema);