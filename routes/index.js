module.exports = (router, Users, passport)=>{
  router.get('/', isAuth, async function(req, res, next) {
      var user = req.session.passport.user || "";
      var user_info = Users.findOne(user);
      return await res.render('index', {user: user_info});
  })

  return router;
}
