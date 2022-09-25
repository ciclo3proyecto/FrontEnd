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
