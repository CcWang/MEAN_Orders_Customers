var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customerSchema = new mongoose.Schema({
  name:String,
  created:{type: Date, default:Date.now},
  orders:[{type:Schema.Types.ObjectId,ref:"Order"}]
})

mongoose.model('Customer',customerSchema);