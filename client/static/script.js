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
  }
  // console.log(customers)
  return factory;
})
myApp.controller('CustomerController',function($scope,CustomerFactory){
  CustomerFactory.index(function(data){
    $scope.customers = data;
  })
  $scope.removeCustomer = function(_id){
    CustomerFactory.removeCustomer(_id);
  }
})
