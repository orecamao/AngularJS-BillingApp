var app = angular.module('billingApp.clientsCtrl', []);
//===============================
//  Controlador de Clientes
//===============================

app.controller('clientsCtrl', ['$scope', 'Clients', '$routeParams', function($scope, Clients, $routeParams){
    
    var pag = $routeParams.pag;

    $scope.activar('mClientes', '', 'Clientes', 'Listado');
    $scope.clientes = {};
    $scope.clienteSel = {};

    $scope.moverA =function(pag){
        Clients.cargarPagina(pag).then(function(){
            $scope.clientes = Clients;
            console.log("🚀 ~ file: clientsCtrl.js:13 ~ Clients.cargarPagina ~ scope.clientes:", $scope.clientes);
        });
    }

    $scope.moverA(pag);

//=====================================
// Mostrar modal de edición
//=====================================

$scope.mostrarModal = function(cliente){

    angular.copy(cliente, $scope.clienteSel);

    $("#modal_cliente").modal();
}

//=====================================
// Funcion para guardar
//=====================================

$scope.guardar = function (cliente ,frmCliente) {
    Clients.guardar(cliente).then(function(response){
        $("#modal_client").modal('hide');
        $scope.clienteSel = {};
        frmCliente.autoValidateFormOptions.resetForm();
    });
}

}]);