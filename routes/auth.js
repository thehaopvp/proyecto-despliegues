const express = require("express");
let usuario = require(__dirname + "/../models/usuario.js");
const sjcl = require("sjcl");
let script = (numero1) => {
  myString = numero1;
  myBitArray = sjcl.hash.sha256.hash(myString);
 return myHash = sjcl.codec.hex.fromBits(myBitArray);
};

let router = express.Router();

let autenticacion = (req, res, next) => {
  if (req.session && req.session.usuario)
    return next();
  else
    res.render('login');
};

router.get("/", (req, res) => {
  res.render("auth_login");
});

router.post("/", (req, res) => {
  usuario.find({ login: req.body.login, password:script(req.body.password)}).then(resultado => {
    if (resultado.length > 0)
    {
      req.session.usuario = resultado[0].login;
      res.redirect('/peliculas');
    }
    else
      res.render("auth_login", { Error: "Usuario contraseña erroneos" });
  })
    .catch(error => {
      res.render("auth_login", { Error: "Error al realizar la peticion " });
    });
})

module.exports = router;
