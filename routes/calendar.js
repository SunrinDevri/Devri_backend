module.exports = (router, Users, now_time)=>{
  router.get('/', async function(req, res, next) {
    var user = await Users.findOne({id: req.user.id, passwd: req.user.passwd});
    var calendar = user.calendar;
    res.status(200).send(calendar);
  });
  router.get('/:month/:day', async function(req, res, next)=>{
    var year = now_time.format("YYYY");
    var user = await Users.findOne({id: req.user.id, passwd: req.user.passwd});
    var calendar = user.calendar;
    var month = req.params.month;
    var day = req.params.day;
    var contet;

    for (var i = 0; i < calendar.length; i++)
      if(calendar[i].date === year+month+day) contet = calendar[i]
    res.status(200).json(contet);

  });

  return router;
}
