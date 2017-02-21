angular.module('galleryApp')
  .factory('popularPicsFactory', ['$resource', function ($resource) {
    return $resource('http://localhost:3000/pics/popular', null);
  }]);
