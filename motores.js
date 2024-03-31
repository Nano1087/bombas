const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cookieParser = require('cookie-parser')
const authentication = require('./controllers/authentication.controller.js');
const authorization = require('./middlewares/authorization.js');
let message 


//server
app.listen(3000, () => {
  console.log('Servidor Express escuchando en el puerto 3000');
});

//Configuración
app.use(morgan('dev'));
app.use(bodyParser.json());
app.set('views','vistas');
app.set('view engine','ejs');
app.use(express.static('./public'));
app.use(express.json());
//app.use(express.urlencoded({extended: true}));
app.use(cookieParser())


//rutas o endpoints
app.get('/', function (req, res,next) {
  res.render('login',{})
  next();
})
app.get('/bombas/',authorization.soloPublico, function (req, res) {
  res.render('bombas',{})
})
app.get('/index/', function (req, res) {
  res.render('index')
})

//app.post('/login', function (req, res) {
 // const user = req.params.user;
  //console.log(user);
//})
app.post('/login',authentication.login);

app.post('/encender/:motor', (req, res) => {
  const motor = req.params.motor;
  //console.log(motor);
  
  if (motor === 'motor1' || motor === 'motor2' || motor === 'motor3') {
    message = 'encender';
    console.log(message);
      //res.send('encender'); 
      res.send(`Encendiendo ${motor}`);
      
  
  } else {
    res.status(400).render('404');
  }
 
});

app.post('/apagar/', (req, res) => {
  const motor = req.params.motor;
  //console.log(motor);
  
  if (motor === 'motor1' || motor === 'motor2' || motor === 'motor3') {
     message = 'apagar';
    console.log(message);
      //res.send('encender'); 
      res.send(`Apagando ${motor}`);
      
  
  } else {
    res.status(400).render('404');
  }
 
});
app.post('/respuestaesp8266/', function (req, res) {
  res.send(message)
  console.log(message)
})



