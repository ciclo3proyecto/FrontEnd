//Me permite realizar acciones inmediatamente despues de cargar la pagina.
document.addEventListener('DOMContentLoaded', () =>{
    const nombre = sessionStorage.getItem("nombreUsuario");
    const perfil = sessionStorage.getItem("perfil");
    const nombrePerfil = sessionStorage.getItem("nombrePerfil");
    console.log(nombre)
    if(nombre == null)
    {
        mensaje("Mensaje del sistema","Debe realizar el login o ingreso al sistema.")
        return
    }

    document.getElementById("lblUsuario").innerText=`Bienvenido ${nombre} (${nombrePerfil})`

    mostrarOpciones(perfil,0);

})


const mostrarOpciones = async  (perfil,padreId) => {

    const data = await permisos(perfil, padreId);
    const modulosContainer = document.querySelector('#modulosContainer');

    if (typeof data == "string") 
    {
        alert(data);
        return
    }

    if (data.ok) 
    {
        const djson = await data.json();
        const ojson = JSON.parse(JSON.stringify(djson));
        
        ojson.forEach(permiso => {
            
            modulosContainer.innerHTML += 
            `<div class="col-md-3 col-sm-6">
                <div class="card card-block" onclick="rutas('${permiso.ruta}')">
                    <img id="imagenModulo" src="${permiso.rutaImagen}" alt="Photo of sunset">
                    <h5 class="card-title mt-3 mb-3">${permiso.opcion}</h5>
                </div>
             </div>
            `
        });

    }
    else {
        alert("Los datos ingresados son invalidos.");
    }
    
    

}



