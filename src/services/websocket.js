import iotgo from '../app'

class WebSocketService {
  static get $inject() { return ['Settings'] }
  constructor(Settings){
    this.Settings = Settings
    this.ws = undefined
    this.callbacks = []
    this.connect(undefined)
  }
  
  send(req) {
    const vm = this
    if (typeof req !== 'object' || req === null) {
      return;
    }
  
    req.userAgent = 'web';
    req = angular.toJson(req);
  
    if (this.ws && this.ws.readyState === 1) {
      this.ws.send(req);
      return;
    }
  
    this.connect(function () {
      vm.ws.send(req);
    });
  }

  addListener(callback) {
    this.callbacks.push(callback);
  }

  removeListener(callback) {
    var _index = callbacks.indexOf(callback);
    if (_index === -1) return;
    callbacks.splice(_index, 1);
  }

  connect(send) {
    this.ws = new WebSocket(this.Settings.websocketServer + '/api/ws');

    this.ws.addEventListener('message', function (message) {
      try {
        var data = JSON.parse(message.data);
        callbacks.forEach(function (callback) {
          callback(data);
        });
      }
      catch (err) {
        // Do nothing
      }
    });

    this.ws.addEventListener('error', function () {
      console.log('WebSocket Error');
    });

    this.ws.addEventListener('close', function () {
      console.log('WebSocket closed!');
    });

    if (typeof send === 'function') {
      this.ws.addEventListener('open', send);
    }
  }
}

iotgo.service('WS', WebSocketService)