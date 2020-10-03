const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(require('./../middleware/logger'));
router.use(bodyParser.json());


router.use('/auth', require('./api/auth'));


router.get('/', function(req, res) {
  res.send('API Homepage');
});

router.get('/about', function(req, res) {
  res.json({ version: '0.1v'});
});

module.exports = router;