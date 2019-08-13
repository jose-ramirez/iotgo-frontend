import iotgo from '../../app'

class NavController {
  static get $inject() { return ['User'] }

  constructor(User) {
    this.User = User
  }

  isLoggedIn() {
    return this.User.isLoggedIn()
  }

  logout() {
    this.User.logout()
  }
}

iotgo.controller('NavCtrl', NavController)