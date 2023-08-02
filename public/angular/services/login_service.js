var app = angular.module('login.loginService',[]);

app.factory('LoginService', ['$http', '$q', function($http, $q){

    var self = {

        login: function(datos){
        
        var d = $q.defer();

        $http.post('php/login/post.verify.php', datos)
            .then(function(response){
                console.log(response);
                d.resolve(response.data);
            });

        console.log('FUE LLAMADO desde el servicio login');

        return d.promise;

        }
    };

    return self;
}]);