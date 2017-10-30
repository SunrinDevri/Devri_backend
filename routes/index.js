module.exports = (router)=>{
  router.get('/', function(req, res, next) {
    res.status(200).send("hello");
  })

  return router;
}
