var app = angular.module('billingApp.configuration',[]);

app.factory('Configuration', ['$http', '$q', function($http, $q){
    
    var self = {
        config:{},
        cargar: function(){
            var d = $q.defer();

            $http.get('configuration.json')
                .then(function(response){

                    self.config = response;
                    d.resolve();

                })
                .catch(function(){

                    d.reject();
                    console.error("No se pudo cargar el archivo de configuración");
                    alert('Error: Verifique que tenga PHP instalado correctamente o que tenga la versión adecuada');
                    
                });

            return d.promise;
        }

    };
    
    return self;
}]);