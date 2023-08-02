var app = angular.module('billingApp.billsCrtl', []);

app.controller('billsCtrl', ['$scope', 'Clients','Bills', function($scope, Clientes, Bills){
	
	$scope.cliente = {};
	$scope.buscar = 1;
	$scope.agregar = {
		producto_id: "",
		cantidad:1
	};

	$scope.factura = Bills;
	$scope.factura.ISV = $scope.config.ISV;

	$scope.hoy = new Date();

	
	$scope.buscarCliente = function(buscar){

		$scope.clientes = {};

		Clientes.buscar(buscar).then(function(){
			
			if( isNaN( buscar ) ){

				$("#modal_buscar_cliente").modal();
				$scope.clientes = Clientes.clientes;

			}else{
				$scope.cliente = Clientes.clientes[0];
			}
		});
	}


	$scope.cliente_sel = function(cliente){
		
		$("#modal_buscar_cliente").modal('hide');
		$scope.cliente = cliente;

	}

	$scope.actualizar = function(){
		Bills.recalcular();
	}

	$scope.buscarProducto = function( producto ){

		if( producto.producto_id == "" ){
			return;
		}

		Bills.buscar_producto( producto.producto_id )
			.then(function( producto ){

				Bills.agregar_detalle( producto );

				$scope.agregar.producto_id = "";
				$scope.agregar.cantidad = 1;

			});
		
	}

	$scope.guardar_factura = function(){

		Bills.cliente_id = $scope.cliente.id;
		Bills.guardar_factura();

	}

	$scope.borrar_detalle = function( item ){

		Bills.borrar_detalle( item );

	}

	$scope.cancelar_orden = function(){

		swal({   
			title: "Estas seguro?",   
			text: "Seguro que desea cancelar la orden?",   
			type: "warning",   
			showCancelButton: true,   
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: "Si",   
			cancelButtonText: "No, cancelar!!!",   
			closeOnConfirm: true,
			closeOnCancel: true 
		}, function(isConfirm){   

			if (isConfirm) {     
				
				$scope.cliente = {};
				Bills.nueva_factura();
				$scope.$apply();
			}

		});

	}

	$scope.facturaTest = {

		compania: 'Super Cafe',
		direccion: '654 alguna calle',
		ciudad: 'Ciudad',
		pais: 'Pais',
		telefono: '(506) 9975-9985',
		correo: 'fernando@gmail.com',
		ISV: 0.15,  // Impuesto sobre ventas
		cliente:{
			nombre: 'John Doe',
			direccion: 'Calle XYZ, avenida 123',
			correo: 'john.doe@gmail.com'
		},
		maestro:{
			id:'FAC-1234-2016',
			creada: '25-oct-2016'
		},
		detalle:[{
			producto:'Producto 123',
			descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
			cantidad: 30,
			precio: 40
		},
		{
			producto:'Producto 456',
			descripcion: 'Lorem ipsum dolor sit amet, consectetur.',
			cantidad: 80,
			precio: 30
		},
		{
			producto:'Producto 789',
			descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, voluptates..',
			cantidad: 10,
			precio: 30
		}],
		subtotal: function(){

			var detalles = this.detalle;
			var subtotal = 0;

			for( i in detalles ){
				subtotal += detalles[i].cantidad * detalles[i].precio ;
			}

			return subtotal;
		},
		impuesto: function(){

			var subTotal = this.subtotal();
			return subTotal * this.ISV;

		},
		granTotal:function(){

			return this.subtotal() + this.impuesto();

		}

	}


	// Funcion que se encarga de mandar a imprimir la pagina
	// igual que presionar CTR+P 
	$scope.imprimir = function(){
		window.print();
	}


	$scope.cliente = $scope.facturaTest.cliente;
	$scope.maestro = $scope.facturaTest.maestro;


}]);