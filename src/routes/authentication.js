const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://sqcxqakhwmnwrzewxwji.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxY3hxYWtod21ud3J6ZXd4d2ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxNDc0MjMsImV4cCI6MjAyMjcyMzQyM30.tNWSgWguO5A6d3HDVLL8gooDinlbzVejsDoZQ2jPyPQ'
const supabase = createClient(supabaseUrl, supabaseKey)

// SIGNUP
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', async (req, res) => {
  const { user, error } = await supabase.auth.signUp({
    email: req.body.email,
    password: req.body.password,
  });

  if (error) return res.redirect('/signup');
  return res.redirect("links/profile");
});

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
  return res.redirect("links/profile");
});

router.get("profile", async (req, res) => {
  const { data: session, error } = await supabase.auth.getSession();

  if (!session) return res.redirect('/signin');
  return res.render('"links/profile"');
});



module.exports =  router ;
