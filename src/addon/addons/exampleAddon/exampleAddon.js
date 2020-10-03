const express = require('express'); // Express Addon
const router = express.Router();

const appData = () => { // App Informations
  return {
    id: 'default-example', // must be unique for publishing and installing your add-on
    //requestForMainPage: true, Requests to be the main Metisium page / remove if no dashboard add-on
    name: "Example", // Display name of your Add-on
    version: 0.1, // Version of your app.
    author: 'Robin Schleser (privat@schleser.org)', // Author name and/or contact
    hasWebAssets: true, // Needs any assets which are exposed? (/pub<AddonFolderName>)
    subURL: '/example', // URL for accessing your add-on
    pages: [ // Descrip all exposed endpoints
      {name: 'Metisium Settings', href: '/main'},
      {name: 'Add-On\'s', href: '/addons'}
    ],
  }
}

const onEnable = (logger) => { // Hook which will be called if the addon was successfully enabled
  logger.info('Example Add-on has been enabled');
}

const onDisable = () => { // Shutdown or disable hook
  logger.info('Example Add-on has been disabled');
}

/** Express Endpoints */
router.get('/', (req, res) => {
  res.render(__dirname + '/ejs/index', { name: "example"}); // Render with template Engine
})

router.get('/main', (req, res) => {
  res.send('Settings of Metisium')
});

router.get('/addons', (req, res) => {
  res.send('All Addons')
});

/** Don't forget to expose these methodes */
module.exports = {
  appData,
  onEnable,
  onDisable,
  router
}
