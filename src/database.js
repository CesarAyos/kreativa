const { createClient } = require('@supabase/supabase-js')

// Inicializa el cliente de Supabase
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchData() {
  const { data, error } = await supabase
    .from('productos')
    .select('*')

  if (error) console.error('Hubo un error al realizar la consulta:', error)
  // else console.log('Datos obtenidos:', data)
}

fetchData();


module.exports = supabase

