import iotgo from '../app'

iotgo
  .filter('typeToHtml', function () {
    var types = {
      '00': 'custom.html',
      '01': 'switch.html',
      '02': 'light.html',
      '03': 'sensor-temperature-humidity.html'
    };

    return function (value) {
      return types[value] || types['00'];
    }
  });