

/* document.getElementsByTagName("button")[0].addEventListener("click",()=>{
  document.cookie ='jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.location.href = "/"
}) */


//const encender = document.getElementById('encender');
//const apagar = document.getElementById('apagar');
const apiUrl = 'http://localhost:3000/encender/';
const apiUrl2 = 'http://localhost:3000/apagar/';



function cerrarsesion(login){
  document.cookie ='jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.location.href = "/"
}




  function encenderMotor(motor) {
    console.log('click');
   
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
      /* apagar.style.display = "block";
      encender.style.display= "none";
      apagar.style.backgroundColor= "red" */
      console.log(`${motor} encendido con éxito`);
    })
    .catch(error => {
      console.error(error.message);
    });
  }
  
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
     /*  encender.style.display = "block";
      apagar.style.display= "none";
      encender.style.backgroundColor= "green" */
      console.log(`${motor} apagado con éxito`);
    })
    .catch(error => {
      console.error(error.message);
    });
  }
  //encender.addEventListener('click',encenderMotor("motor1"));
  //apagar.addEventListener('click',apagarMotor("motor1"));