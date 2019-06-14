import './css/iotgo.css'
import angular from 'angular'
import ngRoute from 'angular-route'
import ngResource from 'angular-resource'

const iotgo = angular.module('iotgo', [ 'ngRoute', 'ngResource' ])

iotgo
    .run([ '$location', function ($location) {
        // Permanent url support
        var path = $location.search().path;
        if(path) {
        $location.search('path', null);
        $location.path(path);
        }
    }])
    .config([ '$routeProvider', '$locationProvider', '$httpProvider',
        function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './modules/home/home.html',
                controller: 'HomeCtrl'
            })
            .when('/login', {
                templateUrl: './modules/login/login.html',
                controller: 'LoginCtrl'
            })
            .when('/signup', {
                templateUrl: './modules/signup/signup.html',
                controller: 'SignupCtrl'
            })
            .when('/profile', {
                templateUrl: './modules/profile/profile.html',
                controller: 'ProfileCtrl'
            })
            .when('/devices', {
                templateUrl: './modules/devices/devices.html',
                controller: 'DevicesCtrl'
            })
            .when('/pricing', {
                templateUrl: './views/pricing.html'
            })
            .when('/about', {
                templateUrl: './views/about.html'
            })
            .when('/guide', {
                templateUrl: './views/guide.html'
            })
            .when('/api', {
                templateUrl: './views/api.html'
            })
            .when('/contact', {
                templateUrl: './views/contact.html'
            })
            .when('/hardware', {
                templateUrl: './views/hardware.html'
            })
            .when('/solution', {
                templateUrl: './views/solution.html'
            })
            .otherwise({
                redirectTo: '/'
            });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            // $httpProvider.interceptors.push('authInterceptor');
        }
    ])
export default iotgo