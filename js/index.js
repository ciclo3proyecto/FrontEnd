async function loguearse()
{
  const usuario = document.getElementsByName("login").item(0).value;
  const password = document.getElementsByName("password").item(0).value;

    const data = await login(usuario,password);

    if (typeof data == "string")
    {
      alert(data);  
      return
    }
    
    if (data.ok) 
    {
        const djson = await data.json();
        const ojson = JSON.parse(JSON.stringify(djson));
        //Guardando los datos en variables de sesión
        sessionStorage.setItem("nombreUsuario", `${ojson.nombres} ${ojson.primerapellido} ${ojson.segundoapellido}`);
        sessionStorage.setItem("perfil", ojson.perfilesId);
        sessionStorage.setItem("codigoUsuario", ojson.id);

        window.location.href ="templates/plataforma.html"
    }
    else
    {
      //mensaje("Mensaje del sistema","Los datos ingresados son invalidos.")
      alert("Los datos ingresados son invalidos.");
    }
    
}






