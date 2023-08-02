var app = angular.module('billingApp.dashboardCtrl', []);
//===============================
//  Controlador de Dshboard
//===============================

app.controller('dashboardCtrl', ['$scope', function($scope){
    
    $scope.activar('mDashboard', '', 'Dashboard', 'Información');
}]);