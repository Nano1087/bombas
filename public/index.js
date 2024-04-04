

/* document.getElementsByTagName("button")[0].addEventListener("click",()=>{
  document.cookie ='jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.location.href = "/"
}) */
function cerrarsesion(login){
  document.cookie ='jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.location.href = "/"
}


const apiUrl = 'http://localhost:3000/encender/';
  function encenderMotor(motor) {
    fetch(apiUrl + motor,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al encender ${motor}`);
      }
      
      console.log(`${motor} encendido con éxito`);
    })
    .catch(error => {
      console.error(error.message);
    });
  }
  const apiUrl2 = 'http://localhost:3000/apagar/';
  function apagarMotor(motor) {
    fetch(apiUrl2 + motor,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al apagar ${motor}`);
      }
      
      console.log(`${motor} apagado con éxito`);
    })
    .catch(error => {
      console.error(error.message);
    });
  }
    