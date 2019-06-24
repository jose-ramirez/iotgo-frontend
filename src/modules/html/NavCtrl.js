import iotgo from '../../app'

// iotgo
//   .controller('NavCtrl', [ '$scope', 'User',
//     function ($scope, User) {
//       $scope.isLoggedIn = User.isLoggedIn;
//       $scope.logout = User.logout;
//     }
//   ]);

class NavController{
  constructor(User){
    this.User = User
  }
  
  isLoggedIn(){
    return this.User.isLoggedIn()
  }

  logout(){
    this.User.logout()
  }
}

iotgo.controller('NavCtrl', NavController)