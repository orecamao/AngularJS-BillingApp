var app = angular.module('billingApp.messages',[]);

app.factory('Messages', ['$http', '$q', function($http, $q){
    
    var self = {

        mensajes: [{
            img: "dist/img/user2-160x160.jpg",
            nombre: "Juan Carlos",
            mensaje: "Bienvenido a nuestro servicio de Facturación",
            fecha: "5-marzo"
        },
        {
            img: "dist/img/user2-160x160.jpg",
            nombre: "Juan Miguel",
            mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elitn",
            fecha: "6-marzo"
        },
        {
            img: "dist/img/user2-160x160.jpg",
            nombre: "Juan Antonio",
            mensaje: "ed do eiusmod tempor incididunt ut labore et dolore magna aliqu",
            fecha: "7-marzo"
        }]

    };
    
    return self;
}]);