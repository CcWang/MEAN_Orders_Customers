var customer_orders = require('./../controllers/customer_orders.js');
module.exports = function (app) {
  // body...
  app.get('/customers',function(req, res){
    customer_orders.customerIndex(req,res);
  });
  app.delete('/customers/:id',function(req,res){
    customer_orders.customerDelete(req,res);
  })
}