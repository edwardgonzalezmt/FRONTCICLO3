function autoInicioRelacionClientes(){
    
    $.ajax({
        url:"http://129.151.110.141:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}

function autoInicioRelacionMaquinas(){

    $.ajax({
        url:"http://129.151.110.141:8080/api/Machine/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
            let $select = $("#select-machine");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
         
            }); 
        }
    
    })
}


function autoInicioMensajes(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.110.141:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMensajes(respuesta);
        }
    
    })

}

function pintarRespuestaMensajes(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
        myTable+="<td>Mensaje</td>";
        myTable+="<td>Cliente</td>";
        myTable+="<td>Maquina</td>";

    "</tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].machine.name+"</td>";
        myTable+="<td> <button onclick='cargarDatosMensajes("+respuesta[i].idMessage+")'>Cargar</button>";
        myTable+="<td> <button onclick=' actualizarInformacionMensajes("+respuesta[i].idMessage+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarMensajes("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMensajes").html(myTable);
}
function traerInformacionMensajes(){
    console.log("test");
        $.ajax({
        url:"http://129.151.110.141:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMensajes(respuesta);
        }
    });
}
function cargarDatosMensajes(id) {
    $.ajax({
        dataType: 'json',
        url:"http://129.151.110.141:8080/api/Message/"+id,
        type: 'GET',

        success: function (respuesta) {
            console.log(respuesta);
            var item = respuesta;
            $("#messagetext").val(item.messageText);
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function guardarInformacionMensajes(){
    if ($("#messagetext").val().length==0 ){

        alert("Todos los campos son obligatorios");
    }else{
    
    
    let var2 = {
        
        messageText:$("#messagetext").val(),
        machine:{id: +$("#select-machine").val()},
        client:{idClient: +$("#select-client").val()},

     
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://129.151.110.141:8080/api/Message/save",
       
        
        success:function(respuesta) {
                console.log(respuesta);
            console.log("Se Guardo El Mensaje Correctamente");
            alert("Se Guardo El Mensaje Correctamente");
            traerInformacionMensajes()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
             window.location.reload()
            alert("No Se Guardo Correctamente");
    
    
        }
        });
    }
}

function actualizarInformacionMensajes(idElemento){
    let myData={
        idMessage:idElemento,
        messageText:$("#messagetext").val(),
        machine:{id: +$("#select-machine").val()},
        client:{idClient: +$("#select-client").val()},

    


    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.110.141:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMensajes").empty();
            $("#messagetext").val("");
            traerInformacionMensajes()
            alert("Se  Actualizo El Mensaje Correctamente")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("No Se Actualizo Correctamente")
        }
    });

}

function borrarMensajes(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://129.151.110.141:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMensajes").empty();
            traerInformacionMensajes();
            alert("Se Elimino El Mensaje Correctamente")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se Elimino Correctamente!")
        }
    });

}