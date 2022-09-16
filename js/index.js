async function login() {
  const url = "http://InventoryApp.somee.com/usuarios/login";
  const usuario = document.getElementsByName("login").item(0).value;
  const password = document.getElementsByName("password").item(0).value;
  const json = JSON.stringify({
    login: usuario,
    password: password,
  });

  /*console.log("usuarios:" + usuario);
  console.log("password:" + password);
  console.log("json:" + json);
  */
  
  // Consumo del servicio para el login
  let response = await fetch(url, {
    method: "POST",
    body: json,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      accept: "application/json",
    },
  })
  
  return response;
        
}


async function pruebas()
{
    const data = await login();

    if (data.ok) 
    {
        const djson = await data.json();
        const res = JSON.parse(JSON.stringify(djson));
        window.location="templates/plataforma.html"
    }
    else
    {
      alert("Los datos ingresados son invalidos.");
    }
}

/* Segmento para las alertas 
const alert = (message, type) => {
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
    alertTrigger.addEventListener('click', () => {
        alert('Nice, you triggered this alert message!', 'success')
    })
}
/**************** */