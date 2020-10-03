var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
var security = require('./../../secure/jwt')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/login', function(req, res) {
  const user = { name: req.body.username, id: 0, role: 'Administrator', roles: ['administrator'] };
  security.generateJwt(user, (token, err) => {
    if (err) throw Error('Error while generating jwt token for user ' + user);
    res.cookie('token', token, { expires: new Date(Date.now() + 2 * 24 * 3600000), sameSite: true });
    res.redirect('/');
  })
});

router.get('/logout', function(req, res) {
  res.clearCookie("token");
  res.redirect('/login');
});

router.get('/about', function(req, res) {
  res.json({ version: '0.1v', path: '/api/auth' });
});

module.exports = router;