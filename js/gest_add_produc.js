//Me permite realizar acciones inmediatamente despues de cargar la pagina.
document.addEventListener("DOMContentLoaded", async () => {
  
    await CargarUnidades();
    
    let txtId = document.getElementById("txtId")
    const EditarId = sessionStorage.getItem("EditarId");
   
    if (EditarId != "" && EditarId != null ) {
      txtId.value = EditarId
      await cargarDatosProducto(EditarId);
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

//consulta los datos de la base de datos de perfiles y los coloca en el select.
const CargarUnidades = async () => {
    const data = await getUnidades();
    const modulosContainer = document.querySelector("#selUnidades");
  
    if (typeof data == "string") {
      alert(data);
      return;
    }
  
    if (data.ok) {
      const djson = await data.json();
      const ojson = JSON.parse(JSON.stringify(djson));
      let cadena = "<option selected>Seleccione...</option>";
      ojson.forEach((unidad) => {
        cadena += `<option value=${unidad.id}>${unidad.descripcion}</option>`;
      });
  
      modulosContainer.innerHTML = cadena;
    } else {
      alert("Error al consumir servicio de unidades.");
    }
  
  };
  

  //cargar los datos del usuario a editar
const cargarDatosProducto = async (id) => {
    const data = await getProductoById(id);
    if (typeof data == "string") {
      alert(data);
      return;
    }
  
    if (data.ok) {
      const djson = await data.json();
      const ojson = JSON.parse(JSON.stringify(djson));
      
      ojson.forEach((producto) => {
  
          let registro = getControles();
          
          registro.txtId.value = id;
          registro.txtCodigo.value = producto.codigo;
          registro.txtNombre.value = producto.nombre;
          registro.txtDescripcion.value = producto.descripcion;
          registro.txtPrecio.value = producto.precio;
          registro.txtExistencia.value = producto.existencia;
          registro.selUnidades.value = producto.unidadesId;
 
      });
    } else {
      alert("Error al consumir servicio de Usuarios.");
    }
  };
  
  //guarda los datos de los controles en una estructura
function getControles()
{
  const data  =
  {
    txtId : document.getElementById("txtId"),
    txtCodigo : document.getElementById("txtCodigo"),
    txtNombre : document.getElementById("txtNombre"),
    txtDescripcion : document.getElementById("txtDescripcion"),
    txtPrecio : document.getElementById("txtPrecio"),
    txtExistencia : document.getElementById("txtExistencia"),
    selUnidades : document.getElementById("selUnidades"),
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

  const myModalCC = document.getElementById('ModalCenterConfirma')
myModalCC.addEventListener('hidden.bs.modal', event => {
  rutas('../templates/gest_produc.html')
})

//guardar registros segun sea editar o insertar.
function guardarRegistro(){

    if(validarDatos())
    {
  
      //se inserta nuevo registro
      if(registro.txtId.value=="0")
      {
        insertarRegistro();
      }
      else //se actualiza registro
      {
         actualizarRegistro();
      }
  
    }
  
  }

  //valida los datos que ingresó el usuarios
function validarDatos(){

    registro = getControles();
    let encabezado = "Se generaron los siguientes errores:";
    let cadena = "";
  
    if (txtCodigo.value=="")
    {
      cadena += "<br> El campo <strong>Código</strong> es obligatorio"
    }
  
    if (txtNombre.value=="")
    {
      cadena += "<br> El campo <strong>Nombre</strong> es obligatorio "
    }
  
    if (txtPrecio.value=="")
    {
      cadena += "<br> El campo <strong>Precio</strong> es obligatorio "
    }
  
    if (txtExistencia.value=="")
    {
      cadena += "<br> El campo <strong>Existencia</strong> es obligatorio "
    }
  
    if (selUnidades.value=="Seleccione...")
    {
      cadena += "<br> El campo <strong>Tipo de Unidad</strong> es obligatorio "
    }
    
    if (cadena != "")
    {
      cadena = encabezado + cadena
      showWarning(cadena)
      return false
    }
    
    return true;
  
  }
  
const insertarRegistro = async ()=>
{

  const producto = getData();
  const data = await insertarProducto(producto);

  if (typeof data == "string") {
    showError(data);
    return
  }

  if (data.ok) {
      mensajeConfirma("Datos guardados correctamente.")
      
  }
  else
  {
    const djson = await data.json();
    const errores = JSON.parse(JSON.stringify(djson));

    mostrarErrores(errores);
    
  }
  
}

const actualizarRegistro = async ()=>
{

  const producto = getData();
  const data = await actualizarProducto(producto);

  if (typeof data == "string") {
    showError(data);
    return
  }

  if (data.ok) {
      mensajeConfirma("Datos actualizados correctamente.")
  }
  else
  {
    const djson = await data.json();
    const errores = JSON.parse(JSON.stringify(djson));

    mostrarErrores(errores);
    
  }
  
}


function getData()
{
  const data  =
  {
    Id: sessionStorage.getItem("EditarId"),
    codigo: document.getElementById("txtCodigo").value,
    nombre: document.getElementById("txtNombre").value,
    descripcion: document.getElementById("txtDescripcion").value,
    precio: document.getElementById("txtPrecio").value,
    existencia: document.getElementById("txtExistencia").value,
    unidadesId: document.getElementById("selUnidades").value,
    creadopor: sessionStorage.getItem("codigoUsuario"),
    actualizadopor: sessionStorage.getItem("codigoUsuario")
  }

  return data; 

}

function mostrarErrores(errores)
{
  let cadena = "Se generaron los siguientes errores:";

  if(errores.errors.Id!=undefined)
  {
    cadena += "<br> "+errores.errors.Id[0]
  }

  if(errores.errors.UnidadesId!=undefined)
  {
    cadena += "<br> "+errores.errors.UnidadesId[0]
  }
  
  if(errores.errors.Codigo!=undefined)
  {
    cadena += "<br> "+errores.errors.Codigo[0]
  }

  if(errores.errors.Nombre!=undefined)
  {
    cadena += "<br> "+errores.errors.Nombre[0]
  }

  if(errores.errors.Descripcion!=undefined)
  {
    cadena += "<br> "+errores.errors.Descripcion[0]
  }

  if(errores.errors.Precio!=undefined)
  {
    cadena += "<br> "+errores.errors.Precio[0]
  }

  if(errores.errors.Existencia!=undefined)
  {
    cadena += "<br> "+errores.errors.Existencia[0]
  }

  if(errores.errors.Creadopor!=undefined)
  {
    cadena += "<br> "+errores.errors.Creadopor[0]
  }

  if(errores.errors.Actualizadopor!=undefined)
  {
    cadena += "<br> "+errores.errors.Actualizadopor[0]
  }

  showError(cadena)
 
}

