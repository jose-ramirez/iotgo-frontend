import iotgo from '../app'
import '../modules/devices/types/custom.html'
import '../modules/devices/types/light.html'
import '../modules/devices/types/switch.html'
import '../modules/devices/types/sensor-temperature-humidity.html'

iotgo
  .filter('typeToHtml', function () {
    var types = {
      '00': 'custom.html',
      '01': 'switch.html',
      '02': 'light.html',
      '03': 'sensor-temperature-humidity.html'
    };

    return function (value, path) {
      return path + (types[value] || types['00']);
    }
  });