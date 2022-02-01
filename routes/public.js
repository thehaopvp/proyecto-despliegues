const express = require("express");

let pelicula = require(__dirname + "/../models/pelicula.js");
let router = express.Router();


// Servicio de listado general

router.get("/", (req, res) => {
 pelicula.find()
    .then(() => {
      res.render("public_index");
    })
    .catch((error) => {
        res.render("public_error", { Error: error });
    });
});

// Servicio de listado por id
router.get("/buscar", (req, res) => {
    pelicula.find({ titulo: req.query.buscar })
    .then((resultado) => {
      if(resultado[0])
      {
        res.render("public_index", { peliculas: resultado });
      }else
      {
        res.render("public_error", { Error: "No se ha encontrado peliculas " });
      }
    })
    .catch((error) => {
      res.render("public_error", { Error: error });
    });
});


router.get("/peliculas/:id", (req, res) => {
    pelicula.findById(req.params.id)
    .then((resultado) => {
      res.render("public_pelicula", { pelicula: resultado});
    })
    .catch((error) => {
      res.render("public_error", { Error: error });
    });
});


module.exports = router;
