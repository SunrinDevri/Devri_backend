module.exports = (router, Users)=>{
  router.get('/', function(req, res, next) {
    try {
      var user = req.session.passport.user || "";
      var user_info = Users.findOne(req.session.passport.user);
      res.render('index', {user: user_info});
    } catch (e) {
      res.redirect('/auth/signin');
    }
  })

  return router;
}
