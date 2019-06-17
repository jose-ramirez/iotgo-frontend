import iotgo from '../app'

iotgo
  .factory('User', ['$http', '$window', 'Settings', function ($http, $window, Settings) {
    var session = undefined;
    return {
      register: function (email, password, response, callback) {
        $http.post(
            `${Settings.httpServer}/api/user/register`,
            {email: email, password: password, response: response})
          .then(function (data) {
            session = data;
            $window.sessionStorage.token = session.jwt;
            callback(undefined, session.user);
          }, function (error) {
            callback(`Register user failed: ${error.data.error}`, undefined);
          })
      },
      login: function (email, password, callback) {
        $http.post(
            `${Settings.httpServer}/api/user/login`,
            {email: email, password: password})
          .then(function (data) {
            session = data.data;
            $window.sessionStorage.token = session.jwt;
            callback(undefined, session.user);
          }, function (error) {
            callback(`Log in failed: ${error.data.error}`, undefined);
          })
      },
      logout: function () {
        session = undefined;
        $window.sessionStorage.token = undefined;
      },
      isLoggedIn: function () {
        return session ? true : false;
      },
      setPassword: function (oldPassword, newPassword, callback) {
        $http.post(
            `${Settings.httpServer}/api/user/password`,
            {oldPassword: oldPassword, newPassword: newPassword})
          .then(function (data) {
            callback(undefined);
          }, function (error) {
            callback(`Change password failed: ${error.data.error}`);
          })
      },
      getUser: function () {
        return session ? session.user : {};
      },
      isActive: function () {
        var token = $window.sessionStorage.token;
        if (!token) {
          return false;
        }
        var info = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'));
        var decodedData = $window.atob(info);
        var json = JSON.parse(decodedData);
        return !!(json.isActivated);
      },
      isExpire: function () {
        var token = $window.sessionStorage.token;
        if (!token) {
          return false;
        }
        var info = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'));
        var decodedData = $window.atob(info);
        var json = JSON.parse(decodedData);
        if (!json.isActivated) {
          return Date.now() > new Date(json.validExpire).getTime();
        }
        return false;
      },
      activeAccount: function (callback) {
        $http.get('/api/user/activeAccount')
          .then(function (data) {
            callback(data);
          }, function (error) {
            callback(`Active Account failed: ${error.data.error}`);
          })
      }
    };
  }]);