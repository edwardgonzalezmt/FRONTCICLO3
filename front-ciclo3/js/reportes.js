function traerReporteStatus(){
    console.log("test");
    $.ajax({
        url:"http://129.151.110.141:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReportes(respuesta);
        }
    });
}
function pintarRespuestaReportes(respuesta){

    let myTable="<table>";
        myTable+="<tr>";
        myTable+="<td>Completadas</td>";
        myTable+="<td>Canceladas</td>"
        "</tr>";
        myTable+="<tr>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
        myTable+="</table>";
    $("#resultadoStatus").html(myTable);
}
function traerReporteDate(){

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;
    console.log(fechaInicio);
    console.log(fechaCierre);
    
        $.ajax({
            url:"http://129.151.110.141:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
    }
    function pintarRespuestaDate(respuesta){

        let myTable="<table>";
        myTable+="<tr>";
        myTable+="<td>Fecha de Inicio</td>";
        myTable+="<td>Fecha de Entrega</td>"
        myTable+="<td>Estado</td>"
    "</tr>";

        for(i=0;i<respuesta.length;i++){
            myTable+="<tr>";
            myTable+="<td>"+respuesta[i].startDate+"</td>";
            myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
            myTable+="<td>"+respuesta[i].status+"</td>";
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoDate").html(myTable);
    }

    function traerReporteClientes(){
        $.ajax({
            url:"http://129.151.110.141:8080/api/Reservation/report-clients",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaClientes(respuesta);
            }
        });
    }
    function pintarRespuestaClientes(respuesta){

        let myTable="<table>";
        myTable+="<tr>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Correo</td>"
        myTable+="<td>Edad</td>"
        myTable+="<td>Total Reservas</td>"
        "</tr>";
          
        for(i=0;i<respuesta.length;i++){
        myTable+="</tr>";
            myTable+="<td>"+respuesta[i].client.name+"</td>";
            myTable+="<td>"+respuesta[i].client.email+"</td>";
            myTable+="<td>"+respuesta[i].client.age+"</td>";
            myTable+="<td>"+respuesta[i].total+"</td>";
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoClientes").html(myTable);
    }
