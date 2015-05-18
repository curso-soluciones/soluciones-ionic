/**
 * Created by campitos on 5/3/15.
 */
angular.module("miAplicacion",["ngResource"])
    .controller("primerController",function($scope, $http, $resource){
        console.log("hola mundo");
        $scope.nombre;
        $scope.saludar="huevotes de toro";
        $scope.misclientes={};
        $scope.clienteId;
        $scope.mensajito="nada";

        var Cliente=$resource("http://192.168.1.69:8080/cliente/:id",{id:'@_id'},
            { guardar: { method: "POST" }, actualizar: { method: "PUT" }, borra: { method: "DELETE"}});

        //bUSCAMOS TODOS GET
        //Hacemos un query
        var clientes = Cliente.query(function(){

            var tama=clientes.length;
            $scope.misclientes=clientes;

            console.log("tamano de los clientes es:"+tama);
            $scope.mensajito="tamano de clienets:"+tama;
        });

        //Buscamos por ID
        var clientePorId=Cliente.get({id:"553f17d9c83007c968a2d740"},function(){
            $scope.clienteId = clientePorId;
            console.log("El nombre es " +clientePorId.nombre +" y su suelod es "+clientePorId.sueldo);
            $scope.hacerClick =function(){
                alert("El sueldo de este es:"+clientePorId.sueldo);
            }

        });

        //Insertamos POST
        var cliente=new Cliente();

        // var direccion1={};
        //  direccion.estado="Mexico"; var eachProduct =
        var dire= {
            "estado": "Mexico",
            "municipio": "Ecatepec"
        };
        cliente.nombre="Juan";
        cliente.edad=24;
        cliente.direccion=dire;
        cliente.sueldo=40000;
        //    cliente.direccion=direccion1;
        cliente.$guardar();

        //Ahora probaremos el update
        var clienteActualizar=new Cliente();
        clienteActualizar.id='5';

        clienteActualizar.nombre="Perrito"
        clienteActualizar.$actualizar();

        // Ahora hacemos un delete
        var clienteBorrar=new Cliente();

        clienteBorrar.$borra({id:'9'});

    });
