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
  },
  findByName: function(req,res){
    // console.log('findByName',req.body)
    Customer.findOne({'name':req.body.name},function(err,data){
      if (err) {
        console.log('findCustomer',err);
      }else{
        res.json(data);
      }
    })
  },
  create: function(req,res){
    
    var customer = new Customer({name:req.body.name,created:Date.now()})
    customer.save(function(err,data){
      if (err) {
        console.log('save customer errors',err);
      }else{
        res.json(data);
      }
    })
  }
}