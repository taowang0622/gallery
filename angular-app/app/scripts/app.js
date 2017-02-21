'use strict';

//ui.router for routing views and controllers
//ngResource for providing interaction support with REST services via the $resource service
//ui.bootstrap for getting some features of bootstrap using AngularJS instead of JQuery
angular.module('galleryApp', ['ngResource', 'ui.router', 'ui.bootstrap'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('galley', {
        url: '/',
        views: {
          'grids': {
            templateUrl: 'views/grids.html',
            controller: 'PopularPicsController'
          }
        }
      });

    //Redirecting to the state gallery
    $urlRouterProvider.otherwise('/');
  });
