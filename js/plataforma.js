//Me permite realizar acciones inmediatamente despues de cargar la pagina.
document.addEventListener('DOMContentLoaded', () =>{
    const nombre = sessionStorage.getItem("nombreUsuario");
    console.log(nombre)
    if(nombre == null)
    {
        mensaje("Mensaje del sistema","Debe realizar el login o ingreso al sistema.")
    }
})

//evento que me permite saber que quiero hacer cuando se cierra la modal.
/*const myModalEl = document.getElementById('exampleModalCenter')
myModalEl.addEventListener('hidden.bs.modal', event => {
    window.location="../index.html"
})
*/