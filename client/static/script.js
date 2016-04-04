var myApp = angular.module('myApp',['ngRoute']);
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
myApp.factory('customerFactory',function($http){
  var factory = {};
  
  return
})
myApp.controller('customerController',function($scope,customerFactory){
  
})
