function autoInicioCategorias(){
    console.log("se esta ejecutando categoria")
    $.ajax({
        url:"http://129.151.110.141:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}
function autoInicioMaquinas(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.110.141:8080/api/Machine/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMaquinas(respuesta);
        }
    
    })

}

function pintarRespuestaMaquinas(respuesta){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Modelo</td>";
        myTable+="<td>Año</td>";
        myTable+="<td>Descripcion</td>";
        myTable+="<td>Categoria</td>";
    "</tr>";

    for(i=0;i<respuesta.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + respuesta[i].name + "</td>";
        myTable+="<td>" + respuesta[i].brand + "</td>";
        myTable+="<td>" + respuesta[i].year + "</td>";
        myTable+="<td>" + respuesta[i].description + "</td>";
        myTable+="<td>" + respuesta[i].category.name + "</td>";
        myTable+='<td><button onclick="cargarDatosMaquinas(' + respuesta[i].id + ')">Cargar</button></td>';
        myTable+='<td><button onclick="actualizarMaquinas(' + respuesta[i].id + ')">Actualizar</button></td>';
        myTable+='<td><button onclick="borrarMaquinas(' + respuesta[i].id + ')">Borrar</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMaquinas").html(myTable);
}
function traerInformacionMaquinas(){
    console.log("test");
        $.ajax({
        url:"http://129.151.110.141:8080/api/Machine/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMaquinas(respuesta);
        }
    });
}
function cargarDatosMaquinas(id) {
    $.ajax({
        dataType: 'json',
        url:"http://129.151.110.141:8080/api/Machine/"+id,
        type: 'GET',

        success: function (respuesta) {
            console.log(respuesta);
            var item = respuesta;

            $("#id").val(item.id);
            $("#Mname").val(item.name);
            $("#brand").val(item.brand);
            $("#year").val(item.year);
            $("#Mdescription").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function agregarMaquinas() {

    if($("#Mname").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#Mdescription").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{

            let elemento = {
                name: $("#Mname").val(),
                brand: $("#brand").val(),
                year: $("#year").val(),
                description: $("#Mdescription").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://129.151.110.141:8080/api/Machine/save",
                data: dataToSend,
                datatype: 'json',

                success: function (respuesta) {
                    console.log(respuesta);
                    console.log("Se Guardo Maquina Correctamente");
                    //Limpiar Campos
                    $("#Mresultado").empty();
                    $("#Mname").val("");
                    $("#brand").val("");
                    $("#year").val("");
                    $("#Mdescription").val("");

                    alert("Se Guardo Maquina Correctamente")
                    traerInformacionMaquinas()
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
}
//Manejador DELETE
function borrarMaquinas(idElemento) {
    var elemento = {
        id: idElemento
    }
    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://129.151.110.141:8080/api/Machine/"+idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#resultadoMaquinas").empty();
                traerInformacionMaquinas()
                alert("Se Elimino Maquina Correctamente")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No Se Puede Borrar")
            }
        });
}

//Manejador PUT
function actualizarMaquinas(idElemento) {
    
    if($("#Mname").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#Mdescription").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#Mname").val(),
            brand: $("#brand").val(),
            year: $("#year").val(),
            description: $("#Mdescription").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://129.151.110.141:8080/api/Machine/update",
            type: "PUT",

            success: function (respuesta) {
                console.log(respuesta);
                $("#resultadoMaquinas").empty();
                traerInformacionMaquinas();
                alert("Se Actualizo Maquina Correctamente")

                //Limpiar Campos
                $("#Mresultado").empty();
                $("#id").val("");
                $("#Mname").val("");
                $("#brand").val("");
                $("#year").val("");
                $("#Mdescription").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No Se Actualizo Correctamente")
            }
        });
    }
}
