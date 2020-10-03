const secure = (app) => {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.get('*', function(req, res){
    res.status(404).send('what???');
  });
}

module.exports = {
  secure,
}