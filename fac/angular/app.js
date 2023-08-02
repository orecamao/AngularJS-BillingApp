var app = angular.module('billingApp', [
    'ngRoute', 
    'jcs-autoValidate',
    'billingApp.configuration',
    'billingApp.messages',
    'billingApp.notifications',
    'billingApp.clientsCtrl',
    'billingApp.dashboardCtrl',
    'billingApp.clients',
    'billingApp.bills'
]);

angular.module('jcs-autoValidate')
.run([
    'defaultErrorMessageResolver',
    function (defaultErrorMessageResolver) {
        // To change the root resource file path
        defaultErrorMessageResolver.setI18nFileRootPath('angular/lib');
        defaultErrorMessageResolver.setCulture('es-co');
    }
]);


app.controller('mainCtrl', ['$scope', 'Configuration', 'Messages', 'Notifications', function($scope, Configuration, Messages, Notifications){
    
    $scope.config = {};
    $scope.mensajes = Messages.mensajes;
    $scope.notificaciones = Notifications.notificaciones;
    $scope.titulo = "";
    $scope.subtitulo = "";


    $scope.usuario = {
        nombre:"Oriel Camaño"
    };

    Configuration.cargar().then(function() {
        $scope.config = Configuration.config;


    });

//==================================================
//  Funciones Globales del Scope
//==================================================

    $scope.activar = function(menu, submenu, titulo, subtitulo) {
        $scope.mDashboard = "";
        $scope.mClientes = "";
        $scope.titulo = titulo;
        $scope.subtitulo = subtitulo;

        $scope[menu] = 'active';
    };

}]);   

// ================================================
//   Directivas
// ================================================
app.directive('enterKey', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.enterKey);
                });

                event.preventDefault();
            }
        });
    };
});

//==================================================
//  Rutas
//==================================================

app.config(['$routeProvider', function($routeProvider){

    $routeProvider
        .when('/',{
            templateUrl:'dashboard/dashboard.html',
            controller: 'dashboardCtrl'
        })
        .when('/facturas',{
			templateUrl: 'facturas/bills.html',
		})
        .when('/facturanueva',{
			templateUrl: 'facturas/new_bill.html',
			controller: 'facturaCtrl'
		})
        .when('/clientes/:pag',{
            templateUrl:'clientes/clients.html',
            controller: 'clientsCtrl'
        })
        .otherwise({
            redirectTo:'/'
        })
}]);

//==================================================
//  Filtros
//==================================================

app.filter('quitarLetra', function(){
      
    return function(palabra){

        if(palabra){
            if(palabra.length > 1)
                return palabra.substr(1);
           else 
            return palabra;
        }
    }
})

.filter('mensajeCorto', function(){
      
    return function(mensaje){

        if(mensaje){
            if(mensaje.length > 35)
                return mensaje.substr(0,35) + "...";
           else 
            return mensaje;
        }
    }
})

