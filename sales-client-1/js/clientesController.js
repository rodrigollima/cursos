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

    $scope.save = function(){
        $scope.showLoader();

        url = $scope.server("customer/"+$routeParams.id);
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

        $http.post(url, $scope.row)

        //$http.post($scope.server("/customer/"+$routeParams.id),$scope.row)
            .success(function(data){
                alert("Salvo com sucesso");
                $scope.row.isUpdate = true;
            });
    }

    $scope.del = function() {
        $scope.showLoader();

        if (confirm("Deseja excluir " + $scope.row.CustomerID + "?")) {

            $http({method: 'DELETE', url: $scope.server("customer/"+$routeParams.id)})

                //$http.delete($scope.server("customer/"+$routeParams.id))
                .success(function(s) {
                    alert("Excluído com sucesso.");
                    $location.path("/clientes");
                });
        }
    }
}