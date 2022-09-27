

//Me permite realizar acciones inmediatamente despues de cargar la pagina.
document.addEventListener("DOMContentLoaded", () => {
  
  cargarSelects();
  
  let txtId = document.getElementById("txtId")
  const EditarId = sessionStorage.getItem("EditarId");
 
  if (EditarId != "" && EditarId != null ) {
    txtId.value = EditarId
    cargarDatosUsuario(EditarId);
  }
  else
  {
    txtId.value = 0;
  }

  const nombre = sessionStorage.getItem("nombreUsuario");
  const perfil = sessionStorage.getItem("perfil");
  const nombrePerfil = sessionStorage.getItem("nombrePerfil");
  
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
async function  cargarSelects() {
  await CargarPerfiles();
  await CargarTiposDocumentos();
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
    
    ojson.forEach((usuario) => {

        let registro = getControles();
        
        registro.txtId.value = id;
        registro.txtUsuario.value = usuario.login;
        registro.txtClave.value = usuario.password;
        registro.selPerfil.value = usuario.perfilesId;
        registro.selTipoDocumento.value = usuario.tiposdocumentosId;
        registro.txtNumero.value = usuario.identificacion;
        registro.txtNombres.value = usuario.nombres;
        registro.txtPrimerApellido.value = usuario.primerapellido;
        registro.txtSegundoApellido.value = usuario.segundoapellido;

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
    let cadena = "<option selected>Seleccione...</option>";
    ojson.forEach((perfil) => {
      cadena += `<option value=${perfil.id}>${perfil.descripcion}</option>`;
    });

    modulosContainer.innerHTML = cadena;
  } else {
    alert("Error al consumir servicio de perfiles.");
  }

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

    let cadena = "<option selected>Seleccione...</option>";
    ojson.forEach((tipo) => {
      cadena += `<option value=${tipo.id}>${tipo.descripcion}</option>`;
    });

    modulosContainer.innerHTML = cadena;
  } else {
    alert("Error al consumir servicio de perfiles.");
  }


};

//guardar registros segun sea editar o insertar.
function guardarRegistro(){

  if(validarDatos())
  {
    const registro = getControles();

    //se inserta nuevo registro
    if(registro.txtId.value=="0")
    {
      console.log("insertar registro")
    }
    else //se actualiza registro
    {
      console.log("actualiza registro")
    }
    

  }

}

//valida los datos que ingresó el usuarios
function validarDatos(){

  registro = getControles();
  let encabezado = "Se generaron los siguientes errores:";
  let cadena = "";

  if (txtUsuario.value=="")
  {
    cadena += "<br> El campo <strong>Usuario</strong> es obligatorio"
  }

  if (txtClave.value=="")
  {
    cadena += "<br> El campo <strong>Clave</strong> es obligatorio "
  }

  if (selPerfil.value=="Seleccione...")
  {
    cadena += "<br> El campo <strong>Perfil</strong> es obligatorio "
  }

  if (selTipoDocumento.value=="Seleccione...")
  {
    cadena += "<br> El campo <strong>Tipo de Documento</strong> es obligatorio "
  }

  if (txtNumero.value=="")
  {
    cadena += "<br> El campo <strong>Numero de Documento</strong> es obligatorio "
  }
  
  if (txtNombres.value=="")
  {
    cadena += "<br> El campo <strong>Nombres</strong> es obligatorio "
  }

  if (txtPrimerApellido.value=="")
  {
    cadena += "<br> El campo <strong>Primer Apellido</strong> es obligatorio "
  }

  if (cadena != "")
  {
    cadena = encabezado + cadena
    showWarning(cadena)
    return false
  }
  
  return true;

}

//guarda los datos de los controles en una estructura
function getControles()
{
  const data  =
  {
    txtId : document.getElementById("txtId"),
    txtUsuario : document.getElementById("txtUsuario"),
    txtClave : document.getElementById("txtClave"),
    selPerfil : document.getElementById("selPerfil"),
    selTipoDocumento : document.getElementById("selTipoDocumento"),
    txtNumero : document.getElementById("txtNumero"),
    txtNombres : document.getElementById("txtNombres"),
    txtPrimerApellido : document.getElementById("txtPrimerApellido"),
    txtSegundoApellido : document.getElementById("txtSegundoApellido")
  }

  return data; 

}

//mostrar mensajes de error
const showError = (message) => {
  alert(message, "danger");
}

//mostrar mensajes de advertencia
const showWarning = (message) => {
  alert(message, "warning");
}

//funcion para construir el mensaje a enviar al usuario.
const alert = (message, type) => {
  document.getElementById("errorBox").innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')
}