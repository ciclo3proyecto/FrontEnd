const urlBaseUsuarios = "http://InventoryApp.somee.com/usuarios/";


/*
Función para validar el acceso al sistema:
estructura del json que devuelve:
{
    "id": 1,
    "perfilesId": 1,
    "login": "admin",
    "nombres": "Administrador",
    "primerapellido": "del Sistema",
    "segundoapellido": ""
}
*/
async function login(usuario, clave) {

  const url = urlBaseUsuarios + "login";

  const json = JSON.stringify({
    login: usuario,
    password: clave,
  });

  try {

    // Consumo del servicio para el login
    let response = await fetch(url, {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "accept": "application/json",
      },
    })

    return response;

  } catch (error) {
    return `Error al consumir el servicio de usuarios/login: ${error}`
  }

}


/*
Función para traer las opciones a las que tiene acceso un usuario
http://InventoryApp.somee.com/usuarios/permisos?perfil_id=1&padre_id=0
estructura del json que devuelve:
{
  "id": 1,
  "opcion": "Usuarios",
  "descripcion": "Modulo para la gestión de usuarios",
  "ruta": "/usuarios"
}
*/
async function permisos(perfil, padreId) {

  const url = `${urlBaseUsuarios}permisos?perfil_id=${perfil}&padre_id=${padreId}`;

  try {

    // Consumo del servicio para el login
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "accept": "application/json",
      },
    })

    return response;

  } catch (error) {
    return "Error al consumir el servicio de usuarios/permisos : " + error
  }

}

async function getUsuarios () {

  const url = `${urlBaseUsuarios}`;

  try {

    // Consumo del servicio para el login
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "accept": "application/json",
      },
    })

    return response;

  } catch (error) {
    return "Error al consumir el servicio de usuarios : " + error
  }

}

async function getUsuarioById (id) {

  const url = `${urlBaseUsuarios}${id}`;

  try {

    // Consumo del servicio 
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "accept": "application/json",
      },
    })

    return response;

  } catch (error) {
    return "Error al consumir el servicio de usuarios : " + error
  }

}



async function eliminarUsuarioPorId(usuarioId,codigoUsuario) {

  const url = urlBaseUsuarios;

  const json = JSON.stringify({
    id: usuarioId,
    eliminadopor: codigoUsuario
  });

  try {

    // Consumo del servicio para el login
    let response = await fetch(url, {
      method: "DELETE",
      body: json,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "accept": "application/json",
      },
    })

    return response;

  } catch (error) {
    return `Error al consumir el servicio de usuarios: ${error}`
  }

}


async function insertarUsuario(usuario) {

  const url = urlBaseUsuarios;

  const json = JSON.stringify(usuario);

  try {

    // Consumo del servicio para el login
    let response = await fetch(url, {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "accept": "application/json",
      },
    })

    return response;

  } catch (error) {
    return `Error al consumir el servicio de usuarios: ${error}`
  }

}


async function actualizarUsuario(usuario) {

  const url = urlBaseUsuarios;

  const json = JSON.stringify(usuario);

  try {

    // Consumo del servicio para el login
    let response = await fetch(url, {
      method: "PUT",
      body: json,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "accept": "application/json",
      },
    })

    return response;

  } catch (error) {
    return `Error al consumir el servicio de usuarios: ${error}`
  }

}
