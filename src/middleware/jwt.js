const jwt = require('../secure/jwt')

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = (typeof authHeader !== 'undefined' ? authHeader.split(' ')[0] : req.cookies.token);

  if(typeof token !== 'undefined') {

      req.token = token;

      jwt.checkJwt(token, (user, err) => {
        req.user = user;
        next();
      })

      
  } else {
      res.redirect('/login')
  }
}

module.exports = {
  auth
}