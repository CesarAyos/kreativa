const { createClient } = require('@supabase/supabase-js');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
