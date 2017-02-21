'use strict';

angular.module('galleryApp', ['ngResource', 'ui.router', 'ui.bootstrap'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('galley',{
        url:'/',
        views:{
          'grids': {
            templateUrl: 'views/grids.html',
            controller: 'PopularPicsController'
          }
        }
      })

    $urlRouterProvider.otherwise('/');
  });
