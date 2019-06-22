import iotgo from '../app'

class AuthInterceptor{
  constructor($window, $q){
    this.q = $q
    this.window = $window  
  }

  request = (config) => {
    config.headers = config.headers || {};
    if (this.window.sessionStorage.token) {
      config.headers.Authorization = `Bearer ${this.window.sessionStorage.token}`
    }
    return config
  }

  response = (response) => {
    if (response.status === 401) {
      this.window.alert('Restricted area, please log in first!');
      return;
    }

    return response
  }

}

iotgo.service('authInterceptor', AuthInterceptor)