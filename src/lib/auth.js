module.exports.isLoggedIn = function(supabase) {
  return async function(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); 

    let { data: user, error } = await supabase.auth.api.getUser(token);

    if (error) return res.sendStatus(403); 


    next(); 
  }
}
