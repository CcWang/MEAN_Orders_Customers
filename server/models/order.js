var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var orderSchema = new mongoose.Schema({
  _customer:{type:Schema.Types.ObjectId, ref:'Customer'},
  product:String,
  quantity:Number,
  cteated:{type:Date, default:Date.now}
})

mongoose.model('Order',orderSchema);