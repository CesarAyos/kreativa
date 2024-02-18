const { createClient } = require("@supabase/supabase-js");



require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function signIn(username, password) {
  const { user, session, error } = await supabase.auth.signIn({
    email: username,
    password: password,
  });

  if (error) {
    console.log(error.message);
    return;
  }

  if (user) {
    console.log("Bienvenido " + user.email);
  } else {
    console.log("El usuario no existe");
  }
}

async function signUp(username, password, cargo_en_la_iglesia) {
  let newUser = {
    cargo_en_la_iglesia,
    email: username,
    password:(password),
  };

  const { user, session, error } = await supabase.auth.signUp({
    email: newUser.email,
    password: newUser.password,
  });

  if (error) {
    console.log(error.message);
    return;
  }

  if (user) {
    console.log("Usuario creado con éxito: ", user.email);
  }
}
