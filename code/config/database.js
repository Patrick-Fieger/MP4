/**
 * Mongoose und MongoDB config
 */

mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/p4');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {console.log('Connected to DB');});