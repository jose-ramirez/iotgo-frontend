import iotgo from '../app'

class UserService{
  static get $inject() { return ['$http', '$window', 'Settings'] }
  constructor($http, $window, Settings){
    this.$http = $http
    this.$window = $window
    this.Settings = Settings
    this.session = undefined
  }

  register(email, password, response, callback) {
    const vm = this
    $http.post(
        `${this.Settings.httpServer}/api/user/register`,
        {email: email, password: password, response: response})
      .then(function (data) {
        vm.session = data;
        vm.$window.sessionStorage.token = vm.session.jwt;
        callback(undefined, session.user);
      }, function (error) {
        callback(`Register user failed: ${error.data.error}`, undefined);
      })
  }

  login(email, password, callback) {
    const vm = this
    this.$http.post(
        `${this.Settings.httpServer}/api/user/login`,
        {email: email, password: password})
      .then(function (data) {
        vm.session = data.data;
        vm.$window.sessionStorage.token = vm.session.jwt;
        callback(undefined, vm.session.user);
      }, function (error) {
        callback(`Log in failed: ${error.data.error}`, undefined);
      })
  }

  logout() {
    this.session = undefined;
    this.$window.sessionStorage.token = undefined;
  }

  isLoggedIn() {
    return this.session ? true : false;
  }

  setPassword(oldPassword, newPassword, callback) {
    this.$http.post(
        `${this.Settings.httpServer}/api/user/password`,
        {oldPassword: oldPassword, newPassword: newPassword})
      .then(function (data) {
        callback(undefined);
      }, function (error) {
        callback(`Change password failed: ${error.data.error}`);
      })
  }

  getUser() {
    return this.session ? this.session.user : {};
  }

  isActive() {
    var token = this.$window.sessionStorage.token;
    if (!token) {
      return false;
    }
    var info = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'));
    var decodedData = this.$window.atob(info);
    var json = JSON.parse(decodedData);
    return !!(json.isActivated);
  }

  isExpire() {
    var token = this.$window.sessionStorage.token;
    if (!token) {
      return false;
    }
    var info = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'));
    var decodedData = this.$window.atob(info);
    var json = JSON.parse(decodedData);
    if (!json.isActivated) {
      return Date.now() > new Date(json.validExpire).getTime();
    }
    return false;
  }

  activeAccount(callback) {
    this.$http.get('/api/user/activeAccount')
      .then(function (data) {
        callback(data);
      }, function (error) {
        callback(`Active Account failed: ${error.data.error}`);
      })
  }
}

iotgo.service('User', UserService)