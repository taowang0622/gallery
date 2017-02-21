angular.module('galleryApp')
  .controller('PopularPicsController', ['$scope', 'popularPicsFactory', function ($scope, popularPicsFactory) {
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.picsPerPage = 12;

    function divideArray(arr, unit) {
      let beginIndex = 0;
      let arrDivided = [];
      while(arr.length - beginIndex > unit) {
        arrDivided.push(arr.slice(beginIndex, beginIndex + unit));
        beginIndex = beginIndex + unit;
      }
      arrDivided.push(arr.slice(beginIndex, arr.length));
      return arrDivided;
    }

    popularPicsFactory.get({},
      res => {
        $scope.picsByPage = divideArray(res.photos, $scope.picsPerPage);
        $scope.totalPics = res.photos.length;
      },
      res => {
        console.log(res.status + ': ' + res.statusText); //TODO
      })
  }]);
