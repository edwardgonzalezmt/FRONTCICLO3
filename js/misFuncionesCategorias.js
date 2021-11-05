function autoInicioCategorias(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.110.141:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaCategorias(respuesta);
        }
    
    })

}

function pintarRespuestaCategorias(respuesta){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Descripcion</td>"
    "</tr>";
    
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+='<td> <button onclick="cargarDatosCategorias('+ respuesta[i].id+')">Cargar</button></td>';
        myTable+="<td> <button onclick=' actualizarInformacionCategorias("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCategorias("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoCategorias").html(myTable);
}

function traerInformacionCategorias(){
    console.log("test");
        $.ajax({
        url:"http://129.151.110.141:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaCategorias(respuesta);
        }
    });
}

function cargarDatosCategorias(id) {
    $.ajax({
        dataType: 'json',
        url:"http://129.151.110.141:8080/api/Category/"+id,
        type: 'GET',

        success: function (respuesta) {
            console.log(respuesta);
            var item = respuesta;

            $("#id").val(item.id);
            $("#Cname").val(item.name);
            $("#Cdescription").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function guardarInformacionCategorias(){
   
    if ($("#Cname").val().length==0 || $("#Cdescription").val().length==0){

        alert("Todos los campos son obligatorios");
    }else{
   
    let var2 = {
        name:$("#Cname").val(),
        description:$("#Cdescription").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://129.151.110.141:8080/api/Category/save",
       
        success:function(respuesta) {
                console.log(respuesta);
            console.log("Se Guardo Categoria Correctamente");
            alert("Se Guardo Categoria Correctamente");
            traerInformacionCategorias()
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se guardo correctamente");
        }
        });}
}

function actualizarInformacionCategorias(idElemento){
    
    if ($("#Cname").val().length==0 || $("#Cdescription").val().length==0){

        alert("Todos los campos son obligatorios");
    }else{
    
    
    let myData={
        id:idElemento,
        name:$("#Cname").val(),
        description:$("#Cdescription").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.110.141:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#Cname").val("");
            $("#Cdescription").val("");
            traerInformacionCategorias();
            alert("Se Actualizo Categoria Correctamente")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("No Se Actualizo Correctamente")
        }
    });}

}

function borrarCategorias(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://129.151.110.141:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCategoria").empty();
            traerInformacionCategorias();
            alert("Se Elimino Categoria Correctamente")
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No Se Puede Borrar");
        }
        
    });

}
