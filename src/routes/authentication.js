const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// SIGNIN
router.get('/signin', (req, res) => {
  res.render('auth/signin');
});

router.post('/signin', async (req, res) => {
  const { user, error } = await supabase.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
  });

  if (error) return res.redirect('/signin');
  req.session.user = {
    isAuthenticated: true,
    
  };
  return res.redirect('profile');
});

router.get('/profile', async (req, res) => {
  const { data: session, error } = await supabase.auth.getSession();

  if (!session) return res.redirect('/signin');
  return res.render('profile');
});


function ensureAuthenticated(req, res, next) {
  if (req.session.user && req.session.user.isAuthenticated) {
    return next();
  } else {
    return res.redirect('/signin');
  }
}

// Ahora puedes usar este middleware en las rutas que quieras proteger
router.get('/profile', ensureAuthenticated, async (req, res) => {
  const { data: session, error } = await supabase.auth.getSession();

  if (!session) return res.redirect('/signin');
  return res.render('profile');
});


module.exports = router;
