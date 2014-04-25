$app = angular.module('app',[ ]);

$app.config(function ($routeProvider) {
   $routeProvider.
   when('/', {controller:listController, templateUrl:'./deep-linking/list.html'}).
   when('/edit/:name', {controller:editController, templateUrl: './deep-linking/form.html'}).
   when('/new', {controller:newController, templateUrl:'./deep-linking/form.html'}).
   otherwise({redirectTo:'/'});
});

$app.run(function($rootScope){
    $rootScope.fruits = ["banana","apple","orange"];
});

function listController($scope)
{

}

function editController($scope, $location, $routeParams)
{
    $scope.title = "Edit fruit";
    $scope.fruit  = $routeParams.name;

    $scope.fruitIndex = $scope.fruits.indexOf($scope.fruit);

    $scope.save = function ()
    {
        $scope.fruits[$scope.fruitIndex]=$scope.fruit;
        $scope.fruits[$scope.fruitIndex]=$scope.fruit;
        $location.path("/");
    }
}

function newController($scope, $location)
{
    $scope.title = "New fruit";
    $scope.fruit = "";

    $scope.save = function()
    {
        $scope.fruits.push($scope.fruit);
        $location.path("/");
    }
}

function appController($scope, $http)
{
    $scope.fruits = Array();

    $scope.getData = function ()
    {
        $http.get('/http/listFruits.html').success(function (data) {
            $scope.fruits = data.fruits;
            console.log($scope.fruits);
        }).error(function (data) {
            alert("Error");
            console.log(data);
        })
    }
}