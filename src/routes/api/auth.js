var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
var security = require('./../../secure/jwt')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/login', function(req, res) {
  const user = { name: req.body.name, id: 0, role: ['admin'] };
  security.generateJwt(user, (token, err) => {
    if (err) throw Error('Error while generating jwt token for user ' + user);
    res.status(201)
    .cookie('access_token', 'Bearer ' + token, {
      expires: new Date(Date.now() + 2 * 24 * 3600000),
      signed: true,
      sameSite: true,
    })
    .redirect(301, '/admin');
  })
});

router.post('/logout', function(req, res) {
  res.send('');
});

router.get('/about', function(req, res) {
  res.json({ version: '0.1v', path: '/api/auth' });
});

module.exports = router;