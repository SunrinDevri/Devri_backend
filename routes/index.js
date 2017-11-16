module.exports = (router, Users, passport, now_time)=>{
  router.get('/', isAuth, async function(req, res, next) {
      res.redirect('/index.html');
  })

  return router;
}
