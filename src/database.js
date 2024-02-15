const { createClient } = require('@supabase/supabase-js')

// Inicializa el cliente de Supabase
const supabaseUrl = 'https://sqcxqakhwmnwrzewxwji.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxY3hxYWtod21ud3J6ZXd4d2ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxNDc0MjMsImV4cCI6MjAyMjcyMzQyM30.tNWSgWguO5A6d3HDVLL8gooDinlbzVejsDoZQ2jPyPQ'
const supabase = createClient(supabaseUrl, supabaseKey)

async function fetchData() {
  const { data, error } = await supabase
    .from('productos')
    .select('*')

  if (error) console.error('Hubo un error al realizar la consulta:', error)
  // else console.log('Datos obtenidos:', data)
}

fetchData();


module.exports = supabase

