function mensaje(titulo,texto){
  
    document.getElementById('exampleModalLongTitle').innerHTML=titulo;
    document.getElementById('contenedorMensaje').innerHTML=texto;
    
    const myModal = new bootstrap.Modal('#exampleModalCenter', {
      keyboard: true,
      show: true
    })
    myModal.show()
  }