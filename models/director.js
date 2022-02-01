const mongoose = require("mongoose");
let DirectorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    minlength: 5,
  },
  nacimiento: {
    type: Date,
  },
});

let director = mongoose.model("director", DirectorSchema);

module.exports = {
  director: director,
};

