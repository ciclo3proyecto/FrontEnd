async function loguearse() {

  const usuario = document.getElementsByName("usuario").item(0).value;
  const password = document.getElementsByName("clave").item(0).value;

  if (usuario == "") {
    alert("Es obligatorio el campo usuario", "warning");
    return;
  }

  if (password == "") {
    alert("Es obligatorio el campo clave", "warning");
    return;
  }



  const data = await login(usuario, password);

  if (typeof data == "string") {
    showError(data);
    return
  }

  if (data.ok) {
    const djson = await data.json();
    const ojson = JSON.parse(JSON.stringify(djson));
    //Guardando los datos en variables de sesión
    sessionStorage.setItem("nombreUsuario", `${ojson.nombres} ${ojson.primerapellido} ${ojson.segundoapellido}`);
    sessionStorage.setItem("perfil", ojson.perfilesId);
    sessionStorage.setItem("codigoUsuario", ojson.id);

    window.location.href = "templates/plataforma.html"
  }
  else {
    //mensaje("Mensaje del sistema","Los datos ingresados son invalidos.")
    showError("Los datos ingresados son invalidos.");
  }

}

const showError = (message) => {
  alert(message, "danger");
}

const alert = (message, type) => {
  document.getElementById("errorBox").innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')
}



