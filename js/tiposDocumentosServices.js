const urlBaseTiposDocumentos = "http://InventoryApp.somee.com/tiposdocumentos/";

async function getTiposDocumentos () {

    const url = `${urlBaseTiposDocumentos}`;
  
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