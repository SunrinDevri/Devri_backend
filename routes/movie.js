var options = {
    key:"eed562953c294601e85b0dd79e7a96b7",
    targetDt:"20171109"
};

module.exports = (router, boxoffices, axios, moment)=>{
  router.get('/', async (req, res)=>{
    options.targetDt=moment.format("YYYYMMDD");
    var boxoffice = await boxoffices.findOne({date: options.targetDt});
    if(boxoffice)
      res.status(200).send(boxoffice);
    else {
      var response = await axios.get("http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json", {params: options});
      var body = response.data.boxOfficeResult;
      body.date = options.targetDt;
      var new_boxoffice = new boxoffices(body);
      try{
        var result = await new_boxoffice.save();
      }catch(e){

      }

      res.status(200).send(result);
    }
  })

  .get('/genre', async (req, res)=>{
    var genre = ["POP","국내가요","락","팝","힙합","EDM"];
    return res.status(200).json({genre: genre});
  })


  return router;
}
