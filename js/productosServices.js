const urlBase = "http://InventoryApp.somee.com/productos/";


async function getProductos () {

  const url = `${urlBase}`;

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

async function getProductoById (id) {

  const url = `${urlBase}${id}`;

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


async function eliminarProductoPorId(productoId,codigoUsuario) {

  const url = urlBase;

  const json = JSON.stringify({
    id: productoId,
    eliminadopor: codigoUsuario
  });

  try {

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


async function insertarProducto(producto) {

  const url = urlBase;

  const json = JSON.stringify(producto);

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
    return `Error al consumir el servicio de productos: ${error}`
  }

}


async function actualizarProducto(producto) {

  const url = urlBase;

  const json = JSON.stringify(producto);

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
    return `Error al consumir el servicio de productos: ${error}`
  }

}
