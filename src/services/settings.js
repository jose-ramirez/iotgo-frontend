import iotgo from '../app'

class SettingsService {
  static get $inject() { return ['$location'] }
  constructor($location) {
    const debugHttpServer = `http://${$location.host()}:3000`
    const prodHttpServer = `https://${$location.host()}`
    const debugWebsocketServer = `ws://${$location.host()}:3000`
    const prodWebsocketServer = `wss://${$location.host()}`
    this.httpServer = $location.protocol() === 'http' ? debugHttpServer : prodHttpServer
    this.websocketServer = $location.protocol() === 'http' ? debugWebsocketServer : prodWebsocketServer
  }
}

iotgo.service('Settings', SettingsService)