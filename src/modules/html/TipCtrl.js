import iotgo from '../../app'

iotgo
  .controller('TipCtrl', ['$scope', '$window', 'User',
    function ($scope, $window, User) {
      $scope.hideSpan = function () {
        $('#checkActiveSpan').hide();
        User.activeAccount(function () {
        });
      }
    }
  ]);