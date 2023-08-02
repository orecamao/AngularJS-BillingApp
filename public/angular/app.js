var app = angular.module('loginApp', ['login.loginService']);

app.controller('mainCtrl', ['$scope', 'LoginService', function($scope, LoginService){
    
$scope.invalido=false;
$scope.cargando=false;
$scope.mensaje="";

$scope.datos = {};

$scope.ingresar = function (datos){
    
    if(datos.usuario.length < 3){
        $scope.invalido=true;
        $scope.mensaje='Ingrese su usuario';
        return;
    } else if(datos.contrasena.length < 3){
        $scope.invalido=true;
        $scope.mensaje='Ingrese su contraseña';
        return;
    }

    $scope.invalido=false;
    $scope.cargando=true;

    LoginService.login(datos).then(function(response){
        //TODO... Continuar
        if(response.data.err){
            $scope.invalido=true;
            $scope.cargando=false;
            $scope.mensaje=response.data.mensaje;
        } else {
            console.log(response.data.mensaje);
            // window.location = data.url;
        }
    });
    
    console.log(datos);
}
}]);    

