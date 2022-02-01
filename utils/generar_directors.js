const mongoose = require('mongoose'); 
const Directormodel = require(__dirname + '/../models/director'); 
const Director = Directormodel.director;

 
mongoose.connect('mongodb://localhost:27017/filmes'); 
 
Director.collection.drop(); 
 
let usu1 = new Director({ 
    nombre: 'haodwa', 
    nacimiento: "2002-06-05T00:00:00.000Z"
}); 
usu1.save(); 
 
let usu2 = new Director({ 
    nombre: 'zhenfgshuo', 
    nacimiento: "2002-06-05T00:00:00.000Z"
}); 
usu2.save(); 