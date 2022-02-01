const mongoose = require("mongoose");
const Directormodel = require("../models/Director");
const director = Directormodel.director;

let prataformaSchema = new mongoose.Schema({
    nombre: {
      type: String,
      require: true,
      minlength: 2,
    },
    data: {
      type: Date,
    },
    abono: {
      type: Boolean,
      default: "no",
    },
  });

let peliculaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  },
  sipnosis: {
    type: String,
    required: true,
    minlength: 10,
    trim: true,
  },
  duracion: {
    type: Number,
    required: true,
    min: 0,
  },
  genero: {
    type: [String],
    require: true,
  },
  imagen: {
    type: String,
  },
  valoracion: {
    type: Number,
    require: true,
    min: 0,
    max: 5,
  },
  plataforma: [prataformaSchema],
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: director,
  },
});

let pelicula = mongoose.model("pelicula", peliculaSchema);
module.exports = pelicula;
