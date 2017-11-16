module.exports = (router, Users)=>{
  router.get('/', async (req, res)=>{
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
    user_info.calendar.nextdayPlan = nextdayPlan;

    return await res.render('index', {user: user_info});
  })

  .post('/user', (req, res)=>{

  })

  .put('/:id', (req, res)=>{

  })

  .delete('/:id', (req, res)=>{

  })

  return router;
}
