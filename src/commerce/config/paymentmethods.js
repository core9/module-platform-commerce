angular.module('core9Dashboard.commerce.paymentmethods', [
  'ui.router',
  'core9Dashboard.config'
])

.config(function ($stateProvider) {
  $stateProvider
  .state('paymentmethods',  {
    url: '/config/commerce/paymentmethods',
    views: {
      "main": {
        controller: 'CommercePaymentMethodsCtrl',
        templateUrl: 'commerce/config/paymentmethods.tpl.html'
      }
    },
    data:{ 
      pageTitle: 'Commerce',
      context: 'commercecontext',
      sidebar: 'config'
    }
  })
  .state('paymentmethod',  {
    url: '/config/commerce/paymentmethod/:id',
    views: {
      "main": {
        controller: 'CommercePaymentMethodEditCtrl',
        templateUrl: 'commerce/config/paymentmethod.tpl.html'
      }
    },
    resolve: {
      method: ["ConfigFactory", "$stateParams", function(ConfigFactory, $stateParams) {
        return ConfigFactory.get({configtype: 'paymentmethod', id: $stateParams.id});
      }]
    },
    data:{ 
      pageTitle: 'Commerce',
      context: 'commercecontext',
      sidebar: 'config'
    }
  });
})

.controller("CommercePaymentMethodsCtrl", function ($scope, $state, ConfigFactory) {
  $scope.methods = ConfigFactory.query({configtype: 'paymentmethod'});
  $scope.add = function(methodname) {
    var method = new ConfigFactory();
    method.configtype = "paymentmethod";
    method.name = methodname;
    method.$save(function (data) {
      $scope.methods.push(data);
      $scope.edit(data);
    });
  };

  $scope.edit = function(method) {
    $state.go('paymentmethod', {id: method._id});
  };

  $scope.remove = function (method, index) {
    method.$remove(function() {
      $scope.methods.splice(index, 1);
    });
  };
})

.controller("CommercePaymentMethodEditCtrl", function ($scope, $state, method) {
  $scope.method = method;
  $scope.save = function() {
    $scope.method.$update(function(data) {
      $state.go('paymentmethods');
    });
  };
})

.run(function(MenuService) {
  MenuService.add('config', {title: "Payment methods", weight: 200, link: "paymentmethods"});
})

;