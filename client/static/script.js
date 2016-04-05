var myApp = angular.module('myApp',["ngRoute"]);
myApp.config(function ($routeProvider){
  $routeProvider
    .when('/customers', {
      templateUrl:'/static/partials/customers.html'
    })
    .when('/orders',{
      templateUrl: '/static/partials/orders.html'
    })
    .when('/home',{
      templateUrl: '/static/partials/home.html'
    })
    .otherwise({
      redirectTo:'/home'
    });
});
myApp.factory('CustomerFactory',function ($window, $http) {
  var factory = {};
  var customers = [];
  factory.index = function(cb){
    $http.get('/customers').success(function(data){
      customers = data;
      cb(customers);
    })
  };
  factory.removeCustomer = function(_id){
    $http.delete('/customers/'+_id).success(function(){
      $window.location.reload();
    })
  };

  factory.check =function (name,cb){
    // console.log(name);
    $http.post('/customer',name).success(function(output){
      if (output) {
        cb('Please pick another name');
      }else{
        $http.post('/new_customer',name).success(function(data){
          customers.push(data);
        })
      }
    })
  }
  // console.log(customers)
  return factory;
});

myApp.factory('OrderFactory', function($window, $http){
  var factory = {};
  factory.products = ['Nike shoes', 'Black Belts','Ice Creams','Candies'];
  factory.index = function(cb) {
    $http.get('/orders').success(function(data){
      orders = data;
      cb(orders);
    })
  };

  factory.createOrder = function(data){
    $http.post('/new_order',data).success(function(data){
      $window.location.reload();
    })
  }
  return factory;
});

myApp.controller('CustomerController',function($scope,CustomerFactory){
  CustomerFactory.index(function(data){
    $scope.customers = data;
  })
  $scope.removeCustomer = function(_id){
    CustomerFactory.removeCustomer(_id);
  }
  $scope.addCustomer = function(){
    // console.log($scope.newCustomer);
    CustomerFactory.check($scope.newCustomer, function(message){
      $scope.errors = message;     
    });
    $scope.newCustomer = {};
  };

});

myApp.controller('OrderController',function($scope,CustomerFactory,OrderFactory){
  CustomerFactory.index(function(data){
    $scope.customers = data;
  });

  var getProduct = function(data){
    $scope.products = data;
  };
  $scope.new_order={}
  $scope.getCustomer = function(c){
    $scope.new_order.customer = c;
  };

  $scope.getQty = function(q){
    $scope.new_order.qty = q;
  };

  $scope.getProduct = function(p) {
    $scope.new_order.p = p;
  }


  getProduct(OrderFactory.products);
  $scope.addOrder = function(){
    console.log($scope.new_order);
    OrderFactory.createOrder($scope.new_order);
  }
  
})
