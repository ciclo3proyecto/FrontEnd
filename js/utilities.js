//para desplegar una modal
//este es especifico cuando se intentar ingresar a una pagina sin haberse logueado
function mensaje(titulo, texto) {
  document.getElementById("exampleModalLongTitle").innerHTML = titulo;
  document.getElementById("contenedorMensaje").innerHTML = texto;

  const myModal = new bootstrap.Modal("#exampleModalCenter", {
    keyboard: true,
    show: true,
  });
  myModal.show();
}

//evento que me permite saber que quiero hacer cuando se cierra la modal.
//este es especifico cuando se intentar ingresar a una pagina sin haberse logueado
const myModalEl = document.getElementById("exampleModalCenter");
myModalEl.addEventListener("hidden.bs.modal", (event) => {
    rutas("../index.html");
});


//Me permite abrir un formulario
const rutas = (formulario) => {
  window.location.href = formulario;
};

//Cierra sesión de la aplicación.
const CerrarSesion = () => {
  sessionStorage.removeItem("nombreUsuario");
  sessionStorage.removeItem("perfil");
  sessionStorage.removeItem("codigoUsuario");
  rutas("../index.html");
};

//Permite Mostar Mensaje de eliminar
function mensajeEliminar(texto) {
  document.getElementById("MensajeEliminar").innerHTML = texto;

  const myModal = new bootstrap.Modal("#ModalCenterDelete", {
    keyboard: true,
    show: true,
  });
  myModal.show();
}

//Permite Mostar Mensaje de eliminar
function mensajeConfirma(texto) {
  document.getElementById("MensajeConfirma").innerHTML = texto;

  const myModal = new bootstrap.Modal("#ModalCenterConfirma", {
    keyboard: true,
    show: true,
  });
  myModal.show();
}

//Función que se utiliza en los cruds para el boton de agregar registro.
const agregar = (ruta) =>{
  sessionStorage.removeItem("EditarId");
  sessionStorage.removeItem("EliminarId");
  rutas(ruta)
}

//Función que se utiliza para poner el mensaje o modal de preguntar el eliminado del registro
const modalEliminar=(id)=>{
  const mensaje=`Esta seguro que desea eliminar el usuario con Id ${id}?`
  sessionStorage.setItem("EliminarId",id);
  mensajeEliminar(mensaje);
}

//Función que se utiliza para llamar el formulario de editar el registro.
const editar = (id,ruta) =>{
  sessionStorage.setItem("EditarId",id);
  console.log(id);    
  rutas(ruta);
}
