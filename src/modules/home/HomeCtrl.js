import iotgo from '../../app'
  
class HomeController {
  constructor(){
    this.slides = []
  }
  
  $onInit(){
    this.slides = [{
      href: 'https://github.com/itead/IoTgo',
      src: '/images/home/slideshow/iot.jpg'
    }, {
      href: 'https://www.indiegogo.com/projects/iotgo-open-source-iot-cloud-solution',
      src: '/images/home/slideshow/indiegogo.jpg'
    }];
  }
}

iotgo.controller('HomeCtrl', HomeController)