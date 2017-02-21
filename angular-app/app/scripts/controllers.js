'use strict';

angular.module('galleryApp')
  .controller('PopularPicsController', ['$scope', 'popularPicsFactory', function ($scope, popularPicsFactory) {
    $scope.currentPage = 1;
    $scope.maxSize = 5; //maximum number of pages shown on the pagination bar
    $scope.picsPerPage = 12;
    $scope.message = 'loading.....';
    $scope.showGallery = false; //true=>show pics and pagination bar  false=>show message

    //divide the passed array into several units
    function divideArray(arr, unit) {
      var arrDivided = [], beginIndex = 0;
      while((arr.length - beginIndex) > unit) {
        arrDivided.push(arr.slice(beginIndex, beginIndex + unit));
        beginIndex = beginIndex + unit;
      }
      arrDivided.push(arr.slice(beginIndex, arr.length));
      return arrDivided;
    }

    popularPicsFactory.get({},
      function (res) {
        $scope.picsByPage = divideArray(res.photos, $scope.picsPerPage);
        $scope.totalPics = res.photos.length;
        $scope.showGallery = true;
      },
      function (res) {
        $scope.message = res.status + ': ' + res.statusText; //showing the error message on the web page
      });
  }]);
