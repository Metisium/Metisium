const fs = require('fs');
const express = require('express');
const router = express.Router();

const addonList = [];

const loadAddons = (logger) => {
  fs.readdirSync('src/addon/addons/').forEach(file => {
    if (fs.existsSync(__dirname + '/addons/' + file + '/' + file + '.js')) {
      addonList.push({ app: require(`./addons/${file}/${file}.js`), name: file, path: __dirname + `/addons/${file}/`});
    } else {
      logger.warn('Addon folder is no place for saving stuff ... :/ ' + file);
    }
  });
  
  let dashboardSet = false;
  for (var i = 0; i < addonList.length; i++) {
    const addon = addonList[i].app;
    if(addon["onEnable"] !== undefined && addon["appData"] !== undefined) {
      logger.info(`${addon.appData().name} by ${addon.appData().author} was loaded!`)
      addon.onEnable(logger, router);
      router.use(addon.appData().subURL, addon.router);

      if(addon.appData().hasWebAssets) {
        router.use('/pub' + addonList[i].name, express.static(addonList[i].path + 'public'));
      }

      if(addon.appData().requestForMainPage && !dashboardSet) {
        router.use("/", addon.router);
        dashboardSet = true;
      }
    } else {
      if(addon["appData"] !== undefined) {
        logger.warn(`${addonList[i].name} couldn't be loaded! Please contact ${addon.appData().author}`);
      } else {
        logger.warn(`${addonList[i].name} couldn't be loaded! Please report this add-on on https://github.com/Metisium/Metisium`);
      }
    }
  }
}


module.exports = {
  loadAddons,
  router
}