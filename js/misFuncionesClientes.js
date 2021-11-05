function autoInicioCliente(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.110.141:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    
    })

}
function pintarRespuestaClientes(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
        myTable+="<td>Email</td>";
        myTable+="<td>Password</td>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Edad</td>";
    "</tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+='<td> <button onclick="cargarDatosClientes('+respuesta[i].idClient + ')">Cargar</button></td>';
        myTable+="<td> <button onclick='actualizarInformacionClientes("+respuesta[i].idClient+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarClientes("+respuesta[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoClientes").html(myTable);
}
function traerInformacionClientes(){
    console.log("test");
        $.ajax({
        url:"http://129.151.110.141:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}

function cargarDatosClientes(id) {
    $.ajax({
        dataType: 'json',
        url:"http://129.151.110.141:8080/api/Client/"+id,
        type: 'GET',

        success: function (respuesta) {
            console.log(respuesta);
            var item = respuesta;

            $("#idClient").val(item.id);
            $("#Clemail").val(item.email);
            $("#Clpassword").val(item.password);
            $("#Clname").val(item.name);
            $("#Clage").val(item.age);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
});
}

function guardarInformacionClientes(){
    let var2 = {
        
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val(),
     
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.110.141:8080/api/Client/save",
       
        
        success:function(respuesta) {
                console.log(respuesta);
            console.log("Se guardo correctamente Cliente");
            alert("Se guardo correctamente Cliente");
            traerInformacionClientes()
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se guardo correctamente");
        }
        });

}

function actualizarInformacionClientes(idElemento){
    let myData={
        idClient:idElemento,
        email:$("#CLemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val(),


    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.110.141:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idClient").val("");
            $("#Clemail").val("");
            $("#Clpassword").val("");
            $("#Clname").val("");
            $("#Clage").val("");
            autoInicioCliente();
            alert("se Actualizo correctamente Cliente")
        }
    });

}

function borrarClientes(idElemento){
    let myData={
        idClient:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://129.151.110.141:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionClientes()
            alert("Se Elimino Cliente")
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se pude borrar");
        }
    });

}