import angular from 'angular'
import 'angular-route'
import 'angular-resource'

import HomeTemplate from './modules/home/home.html'
import LoginTemplate from './modules/login/login.html'
import SignupTemplate from './modules/signup/signup.html'
import DeviceTemplate from './modules/devices/devices.html'
import ProfileTemplate from './modules/profile/profile.html'

import customTemplate from './modules/devices/types/custom.html'
import lightTemplate from './modules/devices/types/light.html'
import powerSwitchTemplate from './modules/devices/types/switch.html'
import tempSensorTemplate from './modules/devices/types/sensor-temperature-humidity.html'

const iotgo = angular.module('iotgo', ['ngRoute', 'ngResource', 'gRecaptcha'])

iotgo
    .run(['$location', '$templateCache', function ($location, $templateCache) {
        // Permanent url support
        var path = $location.search().path;
        if (path) {
            $location.search('path', null);
            $location.path(path);
        }

        $templateCache.put('light.html', lightTemplate);
        $templateCache.put('custom.html', customTemplate);
        $templateCache.put('switch.html', powerSwitchTemplate);
        $templateCache.put('sensor-temperature-humidity.html', tempSensorTemplate);

    }])
    .config(['$routeProvider', '$locationProvider', '$httpProvider',
        function ($routeProvider, $locationProvider, $httpProvider) {
            $routeProvider
                .when('/', {
                    template: HomeTemplate,
                })
                .when('/login', {
                    template: LoginTemplate,
                    controller: 'LoginCtrl',
                    controllerAs: "$ctrl"
                })
                .when('/signup', {
                    template: SignupTemplate,
                    controller: 'SignupCtrl'
                })
                .when('/profile', {
                    template: ProfileTemplate,
                    controller: 'ProfileCtrl'
                })
                .when('/devices', {
                    template: DeviceTemplate,
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

            $httpProvider.interceptors.push('authInterceptor');
        }
    ])
export default iotgo