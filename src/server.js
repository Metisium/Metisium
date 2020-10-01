const app = require('express')();
const security = require('./secure/jwt');
const logger = require('./logger/logger')

security.secure(app);
app.use('/api', require('./routes/apirouter'));

app.listen(process.env.PORT, () => {
  logger.log({
    level: 'info', message: `MyHomeHub app-master listening at http://localhost:${process.env.PORT}`
  });
})
