//Me permite realizar acciones inmediatamente despues de cargar la pagina.
document.addEventListener('DOMContentLoaded', () =>{
    
    sessionStorage.removeItem("EditarId");
    sessionStorage.removeItem("EliminarId");

    const nombre = sessionStorage.getItem("nombreUsuario");
    const perfil = sessionStorage.getItem("perfil");
    const nombrePerfil = sessionStorage.getItem("nombrePerfil");

    if(nombre == null)
    {
        mensaje("Mensaje del sistema","Debe realizar el login o ingreso al sistema.")
        return
    }

    document.getElementById("lblUsuario").innerText=`${nombre} (${nombrePerfil})`

    listarDatos()

})


const listarDatos = async () => {
    const data =  await getProductos();
    const modulosContainer = document.querySelector('#tabla');

    if (typeof data == "string") 
    {
        alert(data);
        return
    }

    if (data.ok) 
    {
        const djson = await data.json();
        const ojson = JSON.parse(JSON.stringify(djson));
        console.log(ojson)
        let cadena = "";
        ojson.forEach(producto => {
            
            cadena += 
                    `<tr>
                        <th scope="row">${producto.id}</th>
                        <th>${producto.codigo}</th>
                        <th>${producto.nombre}</th>
                        <th>${producto.descripcionUnidad}</th>
                        <th>${producto.precio}</th>
                        <th>${producto.existencia}</th>
                        <td>
                            <button type="button" class="btn btn-warning btn-sm"
                                onclick="editar(${producto.id},'../templates/gest_add_produc.html')">Editar</button>
                            <button type="button" class="btn btn-danger btn-sm" onclick="modalEliminar(${producto.id})">Eliminar</button>
                        </td>
                     </tr>
                    `

        });

        modulosContainer.innerHTML = cadena

    }else{
        alert("Error al consumir servicio de productos.");
    }

}

const elimiarId = async () =>{
    const id = sessionStorage.getItem("EliminarId");
    const codigoUsuario = sessionStorage.getItem("codigoUsuario");
    
    const data =  await eliminarProductoPorId(id,codigoUsuario);

    if (typeof data == "string") 
    {
        alert(data);
        return
    }

    if (data.ok) 
    {
        listarDatos();
    }
    else
    {
        const djson = await data.json();
        const ojson = JSON.parse(JSON.stringify(djson));

    }
}
