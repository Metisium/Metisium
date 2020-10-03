const app = require('express')();
const jwt = require('./secure/jwt');
const ends = require('./secure/endpoints');
const logger = require('./logger/logger');
const addonLoader = require('./addon/addonloader')

jwt.secure(app);

app.use('/api', require('./routes/apirouter'));
app.set('view engine', 'ejs');

app.listen(process.env.PORT, () => {
  logger.info(`MyHomeHub app-master listening at http://localhost:${process.env.PORT}`);

  addonLoader.loadAddons(logger);
  app.use('', addonLoader.router);

  ends.secure(app);
})
