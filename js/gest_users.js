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
    const data =  await getUsuarios();
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

        let cadena = "";
        ojson.forEach(usuario => {
            
            cadena += 
                    `<tr>
                        <th scope="row">${usuario.id}</th>
                        <th>${usuario.login}</th>
                        <td>${usuario.nombres} ${usuario.primerapellido} ${usuario.segundoapellido}</td>
                        <td>${usuario.nombrePerfil}</td>
                        <td>
                            <button type="button" class="btn btn-warning btn-sm"
                                onclick="editar(${usuario.id},'../templates/gest_add_users.html')">Editar</button>
                            <button type="button" class="btn btn-danger btn-sm" onclick="modalEliminar(${usuario.id})">Eliminar</button>
                        </td>
                     </tr>
                    `

        });

        modulosContainer.innerHTML = cadena

    }else{
        alert("Error al consumir servicio de usuarios.");
    }

}

const elimiarId = async () =>{
    const id = sessionStorage.getItem("EliminarId");
    const codigoUsuario = sessionStorage.getItem("codigoUsuario");
    
    const data =  await eliminarUsuarioPorId(id,codigoUsuario);

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




