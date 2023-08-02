var app = angular.module('billingApp.notifications',[]);

app.factory('Notifications', ['$http', '$q', function($http, $q){

    var self = {
        notificaciones: [{
            icono: "fa-user",
            notificacion: "Nuevo usuario registrado"
        },
        {
            icono: "fa-save",
            notificacion: "Se está utilizando el 50% del disco duro."
        }]
    };

    return self;
}]);