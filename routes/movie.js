var options = {
   method: 'GET',
   data:{
       key:"95bd8577bc10a33881f6d09e8ccdcdeb",
       targetDt:"20171109"
    },
};
module.exports = (router, boxoffices, request, moment)=>{
  router.get('/', async (req, res)=>{
    options.data.targetDt=moment.format("YYYYMMDD");
    var boxoffice = await boxoffices.findOne({date: options.data.targetDt});
    if(boxoffice)
      res.status(200).send(boxoffice);
    else {
      var response = await request("http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key="+options.data.key+"&targetDt="+options.data.targetDt, options);
      var body = JSON.parse(response.body);
      body.boxOfficeResult.date = options.data.targetDt
      var new_boxoffice = new boxoffices(body.boxOfficeResult);
      try{
        var result = await new_boxoffice.save();
      }catch(e){

      }

      res.status(200).send(result);
    }
  });

  return router;
}
