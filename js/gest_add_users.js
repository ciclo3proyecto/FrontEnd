

//Me permite realizar acciones inmediatamente despues de cargar la pagina.
document.addEventListener("DOMContentLoaded", () => {
  cargarSelects();
  const EditarId = sessionStorage.getItem("EditarId");
  console.log(EditarId)
  if (EditarId != "" && EditarId != null ) {
    cargarDatosUsuario(EditarId);
  }

  const nombre = sessionStorage.getItem("nombreUsuario");
  const perfil = sessionStorage.getItem("perfil");
  const nombrePerfil = sessionStorage.getItem("nombrePerfil");
  console.log(nombre);
  if (nombre == null) {
    mensaje(
      "Mensaje del sistema",
      "Debe realizar el login o ingreso al sistema."
    );
    return;
  }

  document.getElementById(
    "lblUsuario"
  ).innerText = `${nombre} (${nombrePerfil})`;
});

//carga los selects del formulario
function cargarSelects() {
  CargarPerfiles();
  CargarTiposDocumentos();
}

//cargar los datos del usuario a editar
const cargarDatosUsuario = async (id) => {
  const data = await getUsuarioById(id);
  if (typeof data == "string") {
    alert(data);
    return;
  }

  if (data.ok) {
    const djson = await data.json();
    const ojson = JSON.parse(JSON.stringify(djson));
    console.log(ojson);
    
    ojson.forEach((usuario) => {
        let txtId = document.getElementById("txtId");
        txtId.value = id;

        let txtUsuario = document.getElementById("txtUsuario");
        txtUsuario.value = usuario.login;

      let txtClave = document.getElementById("txtClave");
      txtClave.value = usuario.password;

      let selPerfil = document.getElementById("selPerfil");
      selPerfil.value = usuario.perfilesId;

      let selTipoDocumento = document.getElementById("selTipoDocumento");
      selTipoDocumento.value = usuario.tiposdocumentosId;

      let txtNumero = document.getElementById("txtNumero");
      txtNumero.value = usuario.identificacion;

      let txtNombres = document.getElementById("txtNombres")
      txtNombres.value = usuario.nombres;

      let txtPrimerApellido = document.getElementById("txtPrimerApellido");
      txtPrimerApellido.value = usuario.primerapellido;

      let txtSegundoApellido = document.getElementById("txtSegundoApellido");
      txtSegundoApellido.value = usuario.segundoapellido;

    });
  } else {
    alert("Error al consumir servicio de Usuarios.");
  }
};

//consulta los datos de la base de datos de perfiles y los coloca en el select.
const CargarPerfiles = async () => {
  const data = await getPerfiles();
  const modulosContainer = document.querySelector("#selPerfil");

  if (typeof data == "string") {
    alert(data);
    return;
  }

  if (data.ok) {
    const djson = await data.json();
    const ojson = JSON.parse(JSON.stringify(djson));
    console.log(ojson);
    let cadena = "<option selected>Seleccione...</option>";
    ojson.forEach((perfil) => {
      cadena += `<option value=${perfil.id}>${perfil.descripcion}</option>`;
    });

    modulosContainer.innerHTML = cadena;
  } else {
    alert("Error al consumir servicio de perfiles.");
  }

  console.log(data);
};

//consulta los datos de la base de datos de tipos de documento y los coloca en el select.
const CargarTiposDocumentos = async () => {
  const data = await getTiposDocumentos();
  const modulosContainer = document.querySelector("#selTipoDocumento");

  if (typeof data == "string") {
    alert(data);
    return;
  }

  if (data.ok) {
    const djson = await data.json();
    const ojson = JSON.parse(JSON.stringify(djson));
    console.log(ojson);
    let cadena = "<option selected>Seleccione...</option>";
    ojson.forEach((tipo) => {
      cadena += `<option value=${tipo.id}>${tipo.descripcion}</option>`;
    });

    modulosContainer.innerHTML = cadena;
  } else {
    alert("Error al consumir servicio de perfiles.");
  }

  console.log(data);
};
