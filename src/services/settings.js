import iotgo from '../app'

iotgo
  .factory('Settings', [ '$location', function ($location) {
    var debugHttpServer = `http://${$location.host()}:3000`
    var prodHttpServer = `https://${$location.host()}`
    var debugWebsocketServer = `ws://${$location.host()}:3000`
    var prodWebsocketServer = `wss://${$location.host()}`
    return {
      httpServer: $location.protocol() === 'http' ? debugHttpServer : prodHttpServer,
      websocketServer: $location.protocol() === 'http' ? debugWebsocketServer : prodWebsocketServer
    };
  } ]);
