var app = angular.module('billingApp.clients',[]);

app.factory('Clients', ['$http', '$q', function($http, $q){

    var self = {

        'cargando'     	: false, 
        'err'     		: false, 
        'conteo' 		: 0,
        'clientes' 		: [],
        'pag_actual'    : 1,
        'pag_siguiente' : 1,
        'pag_anterior'  : 1,
        'total_paginas' : 1,
        'paginas'	    : [],
        buscar: function( parametro ){

			var d = $q.defer();

			self.cargando = true;

			$http.post('php/clientes/get.client.search.php?p=' + parametro )
				.success(function( respuesta ){

					console.log( respuesta );
					self.cargando = false;

					self.clientes = respuesta.clientes;
					d.resolve();

				});

			return d.promise;

		},
        guardar         : function (cliente){
            var d = $q.defer();

            $http.post('php/clientes/post.clients.save.php', cliente)
                .then(function(response){
                    self.cargarPagina(self.pag_actual);
                    d.resolve();
                })
                .catch(function(){

                    d.reject();
                    console.error("No se pudo cargar el archivo de configuración");
                    alert('Error: Verifique que tenga PHP instalado correctamente o que tenga la versión adecuada');
                    
                });

            return d.promise;
        },
        cargarPagina    : function(pag){
            var d = $q.defer();

            $http.get('php/clientes/get.clients.php?pag=' + pag)
            .then(function(response) {
              var data = response.data; // Acceder a response.data en lugar de data directamente
              console.log('data: ', data);
              self.cargando       = data.cargando;
              self.err            = data.err;
              self.conteo         = data.conteo;
              self.clientes       = data.clientes;
              self.pag_actual     = data.pag_actual;
              self.pag_siguiente  = data.pag_siguiente;
              self.pag_anterior   = data.pag_anterior;
              self.total_paginas  = data.total_paginas;
              self.paginas        = data.paginas;
          
              return d.resolve();
            });
          

            return d.promise;
        }

    };

    return self;
}]);