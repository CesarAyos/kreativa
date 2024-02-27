const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
require('dotenv').config()

// Inicializaciones
const app = express();


// Configuraciones
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("views engine", ".hbs");
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cookieSession({
  name: 'session', 
  keys: ['clave_secreta'],
  maxAge: 300000, 
}));

// Variables globales
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
  next();
});

// Rutas
app.use(require("./routes"));
app.use(require("./routes/authentication"));
app.use("/links", require("./routes/links"));


// Public
app.use(express.static(path.join(__dirname, "public")));






// Inicio del servidor
app.listen(app.get("port"), (err, res) => {
  console.log("server on port", app.get("port"));
});

// Establecer el motor de plantillas
app.set("view engine", ".hbs"); 



