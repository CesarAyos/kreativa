const jwt = require('jsonwebtoken');
const SUPABASE_SECRET_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxY3hxYWtod21ud3J6ZXd4d2ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxNDc0MjMsImV4cCI6MjAyMjcyMzQyM30.tNWSgWguO5A6d3HDVLL8gooDinlbzVejsDoZQ2jPyPQ';

module.exports = {
  async isLoggedIn(req, res, next) {
    const token = req.cookies['sb:token'];
    try {
      const payload = jwt.verify(token, SUPABASE_SECRET_KEY);
      if (payload) {
        return next();
      }
    } catch (error) {
      console.error('Error verifying token:', error.message);
    }
    return res.redirect("/signin");
  },
};