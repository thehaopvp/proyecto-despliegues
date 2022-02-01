const express = require("express");
const autenticacion = require("../utils/auth");
const multer  = require('multer')


let pelicula = require(__dirname + "/../models/pelicula.js");
let router = express.Router();


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
  cb(null, Date.now() + "_" + file.originalname)
  }
  })
 let upload = multer({storage: storage});

// Servicio de listado general

router.get("/nuevo", autenticacion, (req, res) => {
  res.render("admin_peliculas_form");
});

router.get("/",autenticacion, (req, res) => {
  pelicula
    .find()
    .then((resultado) => {
      res.render("admin_peliculas", { peliculas: resultado });
    })
    .catch((error) => {
      res.render("admin_error", { Error: error });
    });
});

// Servicio de listado por id
router.get("/editar/:id", autenticacion,(req, res) => {
  pelicula
    .findById(req.params.id)
    .then((resultado) => {
      res.render("admin_peliculas_form", { peliculas: resultado });
    })
    .catch((error) => {
      res.render("admin_error", { Error: error });
    });
});

// Servicio para insertar peliculas
router.post("/", upload.single('imagen'),autenticacion,(req, res) => {
 let nuevapelicula = new pelicula({
    titulo: req.body.titulo,
    sipnosis: req.body.sipnosis,
    duracion: req.body.duracion,
    genero: req.body.genero,
    imagen: req.file.filename,
    valoracion: req.body.valoracion,
    plataforma: req.body.plataforma,
    director: req.body.director,
  });
  nuevapelicula
    .save()
    .then(() => {
      res.redirect(req.baseUrl);
    })
    .catch((error) => {
      res.render("admin_error", { Error: error });
    });

});

// Servicio para modificar peliculas
router.put("/:id",autenticacion, (req, res) => {
  pelicula
    .findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          titulo: req.body.titulo,
          sipnosis: req.body.sipnosis,
          duracion: req.body.duracion,
          genero: req.body.genero,
          imagen: req.body.imagen,
          valoracion: req.body.valoracion,
          plataforma: [{ nombre : req.body.nombreplataforma, data: req.body.dataplataforma}] ,
          director: req.body.director,
        },
      },
      { new: true }
    )
    .then((resultado) => {
      if (resultado) res.status(200).send({ ok: true, resultado: resultado });
      else
        res.status(400).send({
          ok: false,
          error: "No se ha encontrado el pelicula para actualizar",
        });
    })
    .catch((error) => {
      res.status(400).send({ ok: false, error: "Error actualizando pelicula" });
    });
});

// Servicio para borrar peliculas

router.delete("/:id",autenticacion, (req, res) => {
  pelicula
    .findByIdAndRemove(req.params.id)
    .then((resultado) => {
      res.redirect(req.baseUrl);
    })
    .catch((error) => {
      res.render("admin_error", { error: "Error borrando  pelicula" });
    });
});

module.exports = router;
