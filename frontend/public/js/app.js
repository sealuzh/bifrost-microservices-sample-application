angular.module('bifrostApp', ['ngResource', 'ngCookies', 'angular-jwt', 'ui.router'])
    .config(function ($locationProvider, $httpProvider, $urlRouterProvider, $stateProvider) {
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');

        $stateProvider
            .state('overview', {
                url: "/",
                templateUrl: "overview.html",
                controller: 'ProductsController'
            })
            .state('detail', {
                url: "/detail/:id",
                templateUrl: "detail.html",
                controller: 'DetailController'
            });

        $urlRouterProvider.otherwise("/");
    })
    .controller('ProductsController', function ($scope, Product, Auth) {

        $scope.customer = {};
        $scope.isAuthenticated = Auth.isAuthenticated;

        $scope.login = function () {
            Auth.login($scope.customer.email, $scope.customer.password, function (err, result) {
                $scope.getProducts();
            });
        };

        $scope.logout = function () {
            Auth.logout();
        };

        $scope.getProducts = function () {
            Product.query({}, function (results) {
                $scope.products = results;
            });
        };

        $scope.buyProduct = function (product) {
            product.$buy();
        };

        if (Auth.isAuthenticated()) {
            $scope.getProducts();
        }

    })
    .controller('DetailController', function ($scope, Product, $stateParams) {

        Product.get({productId: $stateParams.id}, function (result) {
            $scope.product = result;
        });

        $scope.buyProduct = function (product) {
            product.$buy();
        };

    })
    .factory('Product', function ($resource) {
        var Product = $resource('http://products.bifrost.com/products/:productId', {productId: '@_id'},
            {
                buy: {
                    method: 'GET',
                    url: 'http://products.bifrost.com/products/:productId/buy'
                }
            }
        );
        return Product;
    })
    .factory('authInterceptor', function ($q, $cookies, jwtHelper) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookies.getObject('customer') !== undefined) {
                    var token = $cookies.getObject('customer').jsonwebtoken;
                    if (!jwtHelper.isTokenExpired(token)) {
                        config.headers.Authorization = 'Bearer ' + token;
                    }
                }
                return config;
            },

            // Intercept 401s and redirect you to login
            responseError: function (response) {
                if (response.status === 401) {
                    $cookies.remove('customer');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };
    })
    .factory('Auth', function ($cookies, $http) {

        var getUser = function () {
            return $cookies.getObject('customer');
        };

        var login = function (email, password, callback) {
            $http.get('http://auth.bifrost.com/customers/login?email=' + email + '&password=' + password).then(function (response) {
                var customerObj = response.data;
                $cookies.putObject('customer', customerObj);
                callback(null, customerObj);
            }, function (response) {
                callback(response);
            });
        };

        var logout = function () {
            $cookies.remove('customer');
        };

        var isAuthenticated = function () {
            return $cookies.getObject('customer') !== undefined;
        };

        return {
            login: login,
            logout: logout,
            getUser: getUser,
            isAuthenticated: isAuthenticated
        };
    });
