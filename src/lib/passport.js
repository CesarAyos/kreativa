const { createClient } = require("@supabase/supabase-js");
const helpers = require("./helpers");

const supabaseUrl = "https://sqcxqakhwmnwrzewxwji.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxY3hxYWtod21ud3J6ZXd4d2ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxNDc0MjMsImV4cCI6MjAyMjcyMzQyM30.tNWSgWguO5A6d3HDVLL8gooDinlbzVejsDoZQ2jPyPQ";
const supabase = createClient(supabaseUrl, supabaseKey);

async function signIn(username, password) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username);

  if (error) {
    console.log(error.message);
    return;
  }

  if (data.length > 0) {
    const user = data[0];
    const validPassword = password === user.password;

    if (validPassword) {
      console.log("Bienvenido " + user.username);
    } else {
      console.log("Contraseña incorrecta");
    }
  } else {
    console.log("El usuario no existe");
  }
}

async function signUp(username, password, cargo_en_la_iglesia) {
  let newUser = {
    cargo_en_la_iglesia,
    username,
    password: await helpers.encryptPassword(password),
  };

  const { data, error } = await supabase
    .from("users")
    .insert([newUser]);

  if (error) {
    console.log(error.message);
    return;
  }

  newUser.id = data[0].id;
  console.log("Usuario creado con éxito: ", newUser);
}