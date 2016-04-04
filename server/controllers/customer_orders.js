var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports = {
  customerIndex: function (req,res) {
    // body...
    Customer.find({},function(err,output){
      if (err) {
        console.log('customerIndex error',err)
      }else{
        res.json(output);
      }
    })
  },
  customerDelete: function(req,res){
    Customer.remove({_id:req.params.id},function(err,data){
      if (err) {
        console.log('delete customer errors',err);
      }else{
        res.end();
      }
    })
  }
}