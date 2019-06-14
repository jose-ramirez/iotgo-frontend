import iotgo from '../../app'

iotgo
  .controller('HomeCtrl', [ '$scope',
    function ($scope) {
      $scope.slides = [{
        href: 'https://github.com/itead/IoTgo',
        src: '/images/home/slideshow/iot.jpg'
      }, {
        href: 'https://www.indiegogo.com/projects/iotgo-open-source-iot-cloud-solution',
        src: '/images/home/slideshow/indiegogo.jpg'
      }];
    }
  ]);