//Me permite realizar acciones inmediatamente despues de cargar la pagina.
document.addEventListener('DOMContentLoaded', () =>{
    const nombre = sessionStorage.getItem("nombreUsuario");
    const perfil = sessionStorage.getItem("perfil");
    console.log(nombre)
    if(nombre == null)
    {
        mensaje("Mensaje del sistema","Debe realizar el login o ingreso al sistema.")
        return
    }

    document.getElementById("lblUsuario").innerText=`Bienvenido ${nombre}`

    mostrarOpciones(perfil,0);

})


const mostrarOpciones = async  (perfil,padreId) => {

    const data = await permisos(perfil, padreId);

    if (typeof data == "string") 
    {
        alert(data);
        return
    }

    if (data.ok) {
        const djson = await data.json();
        const ojson = JSON.parse(JSON.stringify(djson));
        
        ojson.forEach(permiso => {
            
        });
        


      }
      else {
        alert("Los datos ingresados son invalidos.");
      }
    
    

}



