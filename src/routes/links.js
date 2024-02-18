const express = require("express");
const router = express.Router();
const Handlebars = require("handlebars");
const multer = require("multer");
const path = require("path");
const { createClient } = require ('@supabase/supabase-js')
const app = express ();


require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");




router.get('/add', (req, res ) => {
  res.render('links/add');
});


router.get('/profile', (req, res ) => {
  res.render('profile');
});


router.post("/add", upload.single("imagen"), async (req, res) => {
  const { Titulo, Description, categoria, precios } = req.body;
  
  if (!req.file) {
    res.status(400).send('No se cargó ninguna imagen');
    return;
  }
  
  const imagen = req.file.path;
  const newLink = {
    Titulo,
    imagen,
    Description,
    categoria,
    precios,
  };
  
  try {
    const { data, error } = await supabase
      .from('productos')
      .insert([newLink]);
      
    if (error) throw error;
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al guardar el producto');
    return;
  }
  
  req.flash("success", "Producto Guardado");
  res.redirect("/links");
});



router.get('/', async (req, res,) => {

  const { data: productos, error } = await supabase
    .from('productos')
    .select('*')

  if (error) throw error;
  console.log();
  res.render('links/list', { productos });
});


router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase
    .from('productos')
    .delete()
    .eq('id', id);
  if (error) throw error;
  req.flash("success", "producto Eliminado");
  res.redirect("/links");
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { data: productos, error } = await supabase
    .from('productos')
    .select('*')
    .eq('id', id);
  if (error) throw error;
  console.log(productos);
  res.render("links/edit", { productos: productos[0] });
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { Titulo, Description, imagen, categoria,precios } = req.body;
  const newLink = {
    Titulo,
    Description,
    imagen,
    categoria,
    precios
  };
  const { error } = await supabase
    .from('productos')
    .update(newLink)
    .eq('id', id);
  if (error) throw error;
  req.flash("success", "Producto Guardado");
  res.redirect("/links");
});

router.get("/desayunos", async (req, res) => {
  const { data: productos, error } = await supabase
    .from('productos')
    .select('*');
  if (error) throw error;
  res.render("links/desayunos", { productos });
});

router.get("/floristeria", async (req, res) => {
  const { data: productos, error } = await supabase
    .from('productos')
    .select('*');
  if (error) throw error;
  res.render("links/floristeria", { productos });
});


Handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});

router.get('/imagen/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data: rows, error } = await supabase
      .from('productos')
      .select('imagen')
      .eq('id', id);
    if (error) throw error;
    const imagen = rows[0].imagen;
    res.sendFile(path.resolve(imagen));
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al leer la imagen');
  }
});





module.exports = router;
