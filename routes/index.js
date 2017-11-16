module.exports = (router, Users, passport, now_time)=>{
  router.get('/', isAuth, async function(req, res, next) {
      var today = now_time.format("YYYYMMDD");
      var next_day = now_time.add(1, 'days');
      var user = req.session.passport.user || "";
      var user_info = await Users.findOne(user);
      var todayPlan;
      var nextdayPlan;

      for(var i=0; i< user_info.calendar.length; i++){
        if(user_info.calendar[i].date === today){
          todayPlan = user_info.calendar[i].summary;
        }else if(user_info.calendar[i].date === next_day){
          nextdayPlan = user_info.calendar[i].summary;
        }
      }

      user_info.calendar.todayPlan = todayPlan;
      user_info.calendar.nextdayPlan nextdayPlan;
      
      return await res.render('index', {user: user_info});
  })

  return router;
}
