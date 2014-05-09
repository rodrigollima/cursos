function clientesController($scope, $http, $routeParams, $location) {
    $scope.rows = null;
    $scope.row  = null;

    $scope.currentPage = 0;
    $scope.pageSize = 15;

    $scope.numberOfPages = function()
    {
        return Math.ceil($scope.rows.length/$scope.pageSize);
    }

    $scope.loadAll = function () {
        $scope.showLoader();
        $http.get($scope.server("/customers")).success(function (data) {
           $scope.rows = data;
        });
    }

    $scope.loadRow = function() {
        console.log($routeParams.id);
        if ($routeParams.id != null)
        {
            $scope.showLoader();
            $http.get($scope.server("/customer/"+$routeParams.id)).success(function (data) {
               $scope.row = data;
               $scope.row.isUpdate = true;
            });
        } else {
            $scope.row={};
            $scope.row.CustomerID=null;
            $scope.row.isUpdate=false;

        }
    }

}