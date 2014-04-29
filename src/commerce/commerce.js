angular.module('core9Dashboard.commerce.config', [
  'core9Dashboard.commerce.paymentmethods'
])

.controller("CommerceHashController", function ($scope, $http, $q) {
  $scope.$on("save", function (event, promises, item) {
    var encryption = $q.defer();
    promises.push(encryption.promise);
    var fields = {};
    for (var i = $scope.options.fields.length - 1; i >= 0; i--) {
      fields[$scope.options.fields[i]] = item[$scope.options.fields[i]];
    }
    $http.post("/admin/commerce_encrypt", fields)
    .success(function (data) {
      item[$scope.name] = data;
      encryption.resolve();
    });
  });  
})

.controller("CommerceHashConfigController", function ($scope) {
  $scope.data.fields = [];
})

.run(function (FieldConfig) {
  FieldConfig.get('string')
    .addWidget('hash', {template: "commerce/encryption/hashfield.tpl.html", config: "commerce/encryption/hashfield.config.tpl.html"}).save();
})
;