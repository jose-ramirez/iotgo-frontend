import iotgo from '../../app'

class LoginController {
  static get $inject() {
    return ['$window', '$location', 'User']
  }

  constructor($window, $location, User) {
    this.window = $window
    this.location = $location
    this.UserService = User
  }

  login() {
    const that = this
    this.UserService.login(this.email, this.password, function (err, user) {
      if (err) {
        that.window.alert(err);
        return;
      }

      that.location.path('/devices');
    });
  }
}

iotgo.controller('LoginCtrl', LoginController)