const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nunjucks = require("nunjucks");
const methodOverride = require("method-override");

// Enrutadores
const public = require(__dirname + "/routes/public");
const auth = require(__dirname + "/routes/auth");
const peliculas = require(__dirname + "/routes/peliculas");



// Conectar con BD en Mongo
mongoose.connect("mongodb://localhost:27017/filmes", { useNewUrlParser: true });

// Inicializar Express
let app = express();

app.use(session({
  secret: '1234',
  resave: true,
  saveUninitialized: false
 }));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

// Cargar middleware body-parser para peticiones POST y PUT
// y enrutadores
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  }),
); // Para la parte opcional*/
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use("/login", auth);
app.use("/peliculas", peliculas);
app.use("/", public);





// Puesta en marcha del servidor
app.listen(8080);
