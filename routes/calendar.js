module.exports = (router)=>{
  router.get('/', function(req, res, next) {
    res.render('calendar');
  })

  return router;
}
