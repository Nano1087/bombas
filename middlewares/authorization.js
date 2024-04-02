//const { expressjwt: jwt } = require("express-jwt");
//const usuarios = require ("./../controllers/authentication.controller.js");
const jsonwebtoken = require("jsonwebtoken");
const login = require ("./../controllers/authentication.controller.js");
const register = require ("./../controllers/authentication.controller.js");
const dotenv = require('dotenv')
dotenv.config();

const usuarios = [{
  user: "darwin",
  password: "$2a$05$nLY2It8riku2vwwDIINdgO/XIyPXRg1Gn9LFgnhwKqC4TwcAwEUL2"
}]


function soloAdmin(req,res,next){
  const logueado = revisarCookie(req);
  if(logueado) return next();
  //return res.redirect("/")
}

function soloPublico(req,res,next){
  const logueado = revisarCookie(req);
  if(!logueado) return next();
 // return res.redirect("/")
}

function revisarCookie(req){
  try{
    const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
    const decodificada = jsonwebtoken.verify(cookieJWT,process.env.JWT_SECRET);
    console.log(decodificada)
    const usuarioAResvisar = usuarios.find(usuario => usuario.user === decodificada.user);
    console.log(usuarioAResvisar)
    if(!usuarioAResvisar){
      return false
    }
    return true;
  }
  catch{
    return false;
  }
}
module.exports.soloPublico=soloPublico;
module.exports.soloAdmin=soloAdmin;

