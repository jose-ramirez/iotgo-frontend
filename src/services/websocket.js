import iotgo from '../app'

class WebSocketService {

  static get $inject() { return ['Settings'] }

  constructor(Settings){
    this.Settings = Settings
    this.ws = undefined
    this.callbacks = []
    this.connect()
  }
  
  send(req) {
    const vm = this
    if (typeof req !== 'object' || req === null) {
      return;
    }
  
    req.userAgent = 'web';
    req = JSON.stringify(req);
  
    if (this.ws && this.ws.readyState === 1) {
      this.ws.send(req);
      return;
    }
  
    this.connect(() => vm.ws.send(req));
  }

  addListener(callback) {
    this.callbacks.push(callback);
  }

  removeListener(callback) {
    var _index = callbacks.indexOf(callback);
    if (_index === -1) return;
    callbacks.splice(_index, 1);
  }

  connect(sendCallback) {
    const vm = this
    this.ws = new WebSocket(`${this.Settings.websocketServer}/api/ws`);

    this.ws.addEventListener('message', function (message) {
      try {
        var data = JSON.parse(message.data);
        vm.callbacks.forEach(callback => callback(data));
      }
      catch (err) {
        console.error('Error trying to send message:', err)
      }
    });

    this.ws.addEventListener('error', function (error) {
      console.error('WebSocket Error:', error);
    });

    this.ws.addEventListener('close', function (event) {
      console.error('WebSocket closed:', event);
    });

    if (typeof sendCallback === 'function') {
      this.ws.onopen = () => sendCallback();
    }
  }
}

iotgo.service('WS', WebSocketService)