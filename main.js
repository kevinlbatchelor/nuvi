var myApp = angular.module("myApp", []);

myApp.factory("nuviFactory", ['$http', function ($http) {
  var nuviFactory = {};

  nuviFactory.getData = function () {
    return $http({
      method: 'GET',
      url: 'https://nuvi-challenge.herokuapp.com/activities'
    })
  };

  return nuviFactory;
}]);

myApp.controller("ctrl", ['$scope', 'nuviFactory',
  function ($scope, nuviFactory) {
    var ctrl = this;
    ctrl.qty = 100;

    nuviFactory.getData().then(function (response) {
      ctrl.data = _.chunk(response.data, 5);
    }, function (error) {
      console.log('shoot things failed ' + error)
    });

    ctrl.like = function (cIndex, pIndex) {
      ctrl.data.forEach(function (v, i) {
        if (i === pIndex) {
          v.forEach(function (child, index) {
            if (index === cIndex) {
              child.activity_likes = child.activity_likes + 1;
            }
          })
        }
      });
    };
  }]);

