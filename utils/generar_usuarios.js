const mongoose = require("mongoose");
const Usuario = require(__dirname + "/../models/usuario");
const sjcl = require("sjcl");

mongoose.connect("mongodb://localhost:27017/filmes");

Usuario.collection.drop();

let script = (numero1) => {
  myString = numero1;
  myBitArray = sjcl.hash.sha256.hash(myString);
 return myHash = sjcl.codec.hex.fromBits(myBitArray);
};

let usu1 = new Usuario({
  login: "haodwa",
  password: script("12345"),
});
usu1.save();

let usu2 = new Usuario({
  login: "zhengshuo",
  password: script("12345"),
});
usu2.save();


 

let usu3 = new Usuario({
  login: "panchoariel",
  password: script("12345"),
});

usu3.save();
