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
function pintarRespuestaReservas(respuesta){
   
    let myTable="<table>";
    myTable+="<tr>";
        myTable+="<td>Fecha Inicio</td>";
        myTable+="<td>fecha Devolucion</td>";
        myTable+="<td>Estado</td>";
        myTable+="<td>Maquina</td>";
        myTable+="<td>Cliente</td>";
     "</tr>";
      
    for(i=0;i<respuesta.length;i++){
    myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].machine.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+='<td><button  onclick="cargarDatosReservas(' + respuesta[i].idReservation + ')">Cargar</button></td>';
        myTable+='<td><button  onclick="borrarReservas(' + respuesta[i].idReservation + ')">Borrar</button></td>';
        myTable+='<td><button  onclick="actualizarReservas(' + respuesta[i].idReservation + ')">Actualizar</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoReservas").html(myTable);
}

function traerInformacionReservas(){
    $.ajax({
        url:"http://129.151.110.141:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaReservas(respuesta);
        }
    });
}

function cargarDatosReservas(id) {
    $.ajax({
        dataType: 'json',
        url:"http://129.151.110.141:8080/api/Reservation/"+id,
        type: 'GET',

        success: function (respuesta) {
            console.log(respuesta);
            var item = respuesta;

            $("#startDate").val(item.startDate);
            $("#devolutionDate").val(item.devolutionDate);
            $("#status").val(item.status);
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function agregarReservas() {
    
    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
        alert("Todos los campos son Obligatorios")
    }else{  
        let elemento = {
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            machine:{id: +$("#select-machine").val()},
            client:{idClient: +$("#select-client").val()},
            
        }

        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url:"http://129.151.110.141:8080/api/Reservation/save",
            data: dataToSend,
            datatype: "json",

            success: function (respuesta) {
                console.log(respuesta);
                //Limpiar Campos
                $("#resultado5").empty();
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");

                alert("Se Guardo La Reserva Correctamente")
                traerInformacionReservas()
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No Se Guardo Correctamente!")
            }
        });
    }
}
function actualizarReservas(idElemento) {
    
    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            idReservation: idElemento,
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            skate:{id: +$("#select-machine").val()},
            client:{idClient: +$("#select-client").val()},
        }

        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://129.151.110.141:8080/api/Reservation/update",
            type: "PUT",

            success: function (respuesta) {
                console.log(respuesta);
                $("#resultadoReservas").empty();
                alert("Se Actualizo La Reserva Correctamente")
                traerInformacionReservas()

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No Se Actualizo Correctamente")
            }
        });
    }
}

function borrarReservas(idElemento) {
    let elemento = {
        id: idElemento
    }

    let dataToSend = JSON.stringify(elemento);

    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://129.151.110.141:8080/api/Reservation/"+idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (respuesta) {
                $("#resultadoReservas").empty();

                alert("Se Elimino La Reserva Correctamente")
                traerInformacionReservas()
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}