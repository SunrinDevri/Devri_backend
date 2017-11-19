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

  .get('/movie/genre', async (req, res)=>{
    var user = await Users.findOne({id: req.user.id, passwd: req.user.passwd});
    var genre = user.kind;
    return res.status(200).json({genre: genre});
  })

  .put('/movie/genre', async (req, res)=>{
    var user = await Users.findOne({id: req.user.id, passwd: req.user.passwd}, {$set: {movie: {kind: genre}}});
    var genre = user.kind;
    return res.status(200).json({genre: genre});
  })

  .put('/:id', (req, res)=>{

  })

  .delete('/:id', (req, res)=>{

  })

  return router;
}
