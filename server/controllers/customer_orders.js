var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var Order = mongoose.model('Order');
module.exports = {
  customerIndex: function (req,res) {
    // body...
    Customer.find({}).populate('orders').exec(function(err,output){
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
  },
  orderIndex: function(req,res){
    Order.find({},function(err, output){
      if (err) {
        console.log('find all orders errors',err);
      }else{
        res.json(output);
      }
    })
  },
  new_order: function(req,res){
    // console.log(req.body)
    Customer.findOne({_id:req.body.customer},function(err, customer){
      if (err) {
        console.log('findCustomer',err);
      }else{
        var order = new Order({product:req.body.p, quantity:req.body.qty, created:Date.now});
        order._customer = customer._id;
        customer.orders.push(order);
        order.save(function(err,order_res){
          if (err) {
            console.log(err);
          }else{
            customer.save(function(err,customer_res){
              if (err) {
                console.log(err);
              }else{
                res.end();
              }
            })
          }
        })
      }
    })
  }
}