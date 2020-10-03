const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { exit } = require('process');
const logger = require('./../logger/logger')

require('dotenv').config()

let privateKey = null;
let publicKey = null;

const secure = (app) => {
  try {
    if (!fs.existsSync('key')) {
      logger.error("Generate a key pair: ssh-keygen -t rsa -b 4096 -m PEM -f key && openssl rsa -in key -pubout -outform PEM -out key.pub")
      exit(0);
    } else {
      logger.info("Loading key pair for encryption")
      fs.readFile('key', 'utf8', function(err, contents) {
        privateKey = contents;
      });
      fs.readFile('key.pub', 'utf8', function(err, contents) {
        publicKey = contents;
      });
    }
  } catch(err) {
    logger.error(err)
  }
  app.use(helmet());
}

const checkJwt = (jwtToken, cb) => {
  jwt.verify(jwtToken, publicKey, function(err, decoded) {
    cb(decoded, err);
  });
}

const generateJwt = (data, cb) => {
  jwt.sign(data, privateKey, { algorithm: 'RS256', expiresIn: '3h' }, function(err, token) {
    cb(token, err);
  });
}

module.exports = {
  secure,
  checkJwt,
  generateJwt
}