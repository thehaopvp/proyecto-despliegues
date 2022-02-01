const mongoose = require("mongoose");
let UsuarioSchema = new mongoose.Schema({
    login: {
    type: String,
    require: true,
    minlength: 5,
    unique:true
  },
  password: {
    type: String,
    minlength: 5,
    require: true,
  },
});

let Usuario= mongoose.model("Usuario", UsuarioSchema);

module.exports = Usuario
